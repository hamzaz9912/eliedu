import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, LogOut, Download, Calendar, Clock, User } from "lucide-react";
import { authAPI, logout } from "@/lib/api";

interface Course {
  language: string;
  level: string;
  certificateIssueDate: string;
  certificateValidUntil: string;
}

interface Student {
  id: string;
  studentName: string;
  idCardNumber: string;
  courses: Course[];
}

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('user_token');
    if (!token) {
      setLocation('/login');
      return;
    }

    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await authAPI.getUserProfile();
      const result = response.data;
      setStudent(result.student);
    } catch (error: any) {
      console.error('Failed to fetch profile:', error);
      // Error handling is done by axios interceptor
      setLocation('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setLocation('/login');
  };

  const downloadCertificate = (course: Course) => {
    // Mock certificate download - in production, this would generate a PDF
    alert(`Downloading certificate for ${course.language} ${course.level}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <p className="text-muted-foreground">Unable to load student data</p>
            <Button onClick={() => setLocation('/login')} className="mt-4">
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">Student Dashboard</h1>
                <p className="text-primary-foreground/80">European Language Institute</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Student Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Student Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                <p className="text-lg font-semibold">{student.studentName}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">ID Card Number</Label>
                <p className="text-lg font-semibold font-mono">{student.idCardNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certificates */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">My Certificates</h2>

          {student.courses.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground">No certificates yet</h3>
                <p className="text-muted-foreground">Complete a course to receive your certificate</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {student.courses.map((course, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Award className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">
                            {course.language} Certificate
                          </h3>
                          <div className="flex items-center gap-4 mt-1">
                            <Badge variant="secondary" className="text-sm">
                              Level {course.level}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              Issued: {new Date(course.certificateIssueDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              Valid until: {new Date(course.certificateValidUntil).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={() => downloadCertificate(course)}
                        className="flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download Certificate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper component for labels
function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`text-sm font-medium text-muted-foreground ${className}`}>
      {children}
    </div>
  );
}