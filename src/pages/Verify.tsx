import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, CheckCircle2, XCircle, Award, Calendar, User, CreditCard, FileText, QrCode } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { StudentCertificate } from "@shared/schema";

// Extended course type with IELTS scores
interface ExtendedCourse {
  language: string;
  level: string;
  certificateIssueDate: string;
  certificateValidUntil: string;
  ieltsScores?: {
    listening: string;
    reading: string;
    writing: string;
    speaking: string;
  };
  result: string; // Pass/Fail
}



// Extended student certificate type
interface ExtendedStudentCertificate {
  id: string;
  studentName: string;
  passportNumber: string;
  dateOfBirth: string;
  issuingInstitute: string;
  digitalSignature: string;
  certificateId: string;
  courses: ExtendedCourse[];
}
   
// Hardcoded data for specific IDs
const hardcodedStudents: ExtendedStudentCertificate[] = [
  {
    id: "STU20240022",
    studentName: "Fateh Haider",
    passportNumber: "BN6974682",
    dateOfBirth: "23 Jul 1983",
    issuingInstitute: "European Language Institute",
    digitalSignature: "Albrecht",
    certificateId: "STU20240022",
    courses: [
      {
        language: "Deutsch",
        level: "A1",
        certificateIssueDate: "2025-09-15",
        certificateValidUntil: "2026-10-01",
        result: "Pass",
        ieltsScores: {
          listening: "7.5",
          reading: "8.0",
          writing: "7.5",
          speaking: "8.0",
        },
      },
    ],
  },
  {
    id: "STU20240023",
    studentName: "Sajjad Ahmed",
    passportNumber: "XA1159077",
    dateOfBirth: "01 Mar 1978",
    issuingInstitute: "European Language Institute",
    digitalSignature: "Albrecht",
    certificateId: "STU20240023",
    courses: [
      {
        language: "Deutsch",
        level: "A1",
        certificateIssueDate: "2025-08-20",
        certificateValidUntil: "2026-09-15",
        result: "Pass",
        ieltsScores: {
          listening: "8.5",
          reading: "8.0",
          writing: "8.5",
          speaking: "8.0",
        },
      },
    ],
  },
];

export default function Verify() {
  const [idNumber, setIdNumber] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [localStudent, setLocalStudent] = useState<ExtendedStudentCertificate | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<ExtendedCourse | null>(null);

  const { data: student, isLoading, error } = useQuery<StudentCertificate>({
    queryKey: ["/api/verify", idNumber],
    enabled: searchTriggered && idNumber.length > 0 && !localStudent,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (idNumber.trim()) {
      // Check for hardcoded data first - support both passport number and certificate ID
      const foundStudent = hardcodedStudents.find(student =>
        student.passportNumber === idNumber || student.certificateId === idNumber
      );

      if (foundStudent) {
        setLocalStudent(foundStudent);
        setSearchTriggered(true);
      } else {
        setLocalStudent(null);
        setSearchTriggered(true);
      }
    }
  };

  const handleReset = () => {
    setIdNumber("");
    setSearchTriggered(false);
    setLocalStudent(null);
    setSelectedCourse(null);
  };

  const displayStudent = localStudent || (student as unknown as ExtendedStudentCertificate);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="w-16 h-16 mx-auto mb-6" />
          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl mb-6">
            Verify Student Certificate
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-3xl mx-auto">
            Enter a student ID card number to verify their course completion and certificate details
          </p>
        </div>
      </section>

      {/* Verification Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Form */}
          <Card className="border-card-border mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Enter Student ID</CardTitle>
              <CardDescription>
                Please enter the student ID card number or passport number (e.g., STU2024001 or BN6974682)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div>
                  <Label htmlFor="idNumber">Student ID Card Number</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="idNumber"
                      type="text"
                      placeholder="STU2024001"
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value.toUpperCase())}
                      className="flex-1"
                      data-testid="input-student-id"
                    />
                    <Button
                      type="submit"
                      className="bg-primary text-primary-foreground hover:bg-primary"
                      disabled={!idNumber.trim() || isLoading}
                      data-testid="button-search"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      {isLoading ? "Searching..." : "Search"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          {searchTriggered && (
            <div className="animate-fade-in">
              {isLoading && (
                <Card className="border-card-border">
                  <CardContent className="p-12 text-center">
                    <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Searching for student records...</p>
                  </CardContent>
                </Card>
              )}

              {!isLoading && error && (
                <Card className="border-destructive/50 bg-destructive/5">
                  <CardContent className="p-8 text-center">
                    <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
                    <h3 className="font-bold text-xl mb-2 text-foreground">Record Not Found</h3>
                    <p className="text-muted-foreground mb-6">
                      No student record found for ID: <span className="font-mono font-semibold">{idNumber}</span>
                    </p>
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      data-testid="button-try-again"
                    >
                      Try Another ID
                    </Button>
                  </CardContent>
                </Card>
              )}

              {!isLoading && displayStudent && (
                <div className="space-y-6">
                  {/* Student Info */}
                  <Card className="border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-white via-primary/5 to-primary/10 relative overflow-hidden">
                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/5 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

                    <CardHeader className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-primary/10 relative z-10">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                          <CheckCircle2 className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                          Certificate Verified
                        </CardTitle>
                      </div>
                      <CardDescription className="text-base">
                        This certificate has been issued by <span className="font-semibold text-primary">{displayStudent.issuingInstitute}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8 relative z-10">
                      {/* Student Photo and Basic Info */}
                      <div className="text-center space-y-6 relative">
                        <div className="relative inline-block">
                          <div className="w-36 h-36 bg-gradient-to-br from-primary via-primary/80 to-primary/60 rounded-full mx-auto flex items-center justify-center shadow-2xl ring-4 ring-primary/20 ring-offset-4 ring-offset-white" role="img" aria-label="Student photo placeholder">
                            <User className="w-18 h-18 text-white drop-shadow-lg" aria-hidden="true" />
                          </div>
                          {/* Decorative ring */}
                          <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-pulse"></div>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent drop-shadow-sm" data-testid="text-student-name">
                            {displayStudent.studentName}
                          </h3>
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                            <CreditCard className="w-4 h-4 text-primary" />
                            <p className="text-lg text-primary font-mono font-semibold" data-testid="text-id-number">
                              {displayStudent.passportNumber}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Student Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300">
                          <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                            <Award className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <div className="text-sm text-primary/70 mb-2 font-semibold uppercase tracking-wide">Issuing Institute</div>
                            <div className="font-bold text-xl text-foreground">
                              {displayStudent.issuingInstitute}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300">
                          <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                            <FileText className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <div className="text-sm text-primary/70 mb-2 font-semibold uppercase tracking-wide">Digital Signature</div>
                            <div className="font-bold text-xl text-foreground">
                              {displayStudent.digitalSignature}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Certificate ID */}
                      <div className="flex items-center gap-6 p-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl border-2 border-primary/20 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/20 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
                        <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                          <QrCode className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-primary/70 mb-2 font-semibold uppercase tracking-wide">Certificate ID</div>
                          <div className="font-mono font-bold text-2xl text-foreground bg-white/50 px-4 py-2 rounded-xl border border-primary/10">
                            {displayStudent.certificateId}
                          </div>
                        </div>
                      </div>

                      {/* Completed Courses */}
                      <div className="space-y-6">
                        <div className="text-center">
                          <h3 className="font-bold text-3xl mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Completed Courses</h3>
                          <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto rounded-full"></div>
                        </div>
                        <div className="overflow-x-auto rounded-3xl border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-white to-primary/5">
                          <table className="w-full border-collapse bg-card/50 backdrop-blur-sm" role="table" aria-label="Completed courses">
                            <thead className="bg-gradient-to-r from-primary/10 to-primary/5 border-b-2 border-primary/20">
                              <tr>
                                <th className="text-left py-6 px-8 font-bold text-foreground text-xl" scope="col">Course</th>
                                <th className="text-left py-6 px-8 font-bold text-foreground text-xl" scope="col">Level</th>
                                <th className="text-left py-6 px-8 font-bold text-foreground text-xl" scope="col">Result</th>
                                <th className="text-left py-6 px-8 font-bold text-foreground text-xl" scope="col">Issued</th>
                                <th className="text-left py-6 px-8 font-bold text-foreground text-xl" scope="col">Valid Until</th>
                                <th className="text-center py-6 px-8 font-bold text-foreground text-xl" scope="col">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {(displayStudent.courses as ExtendedCourse[]).map((course, index) => (
                                <tr key={index} className="border-b border-primary/10 hover:bg-primary/5 transition-all duration-300 hover:shadow-lg" data-testid={`card-course-${index}`} role="row">
                                  <td className="py-6 px-8" role="gridcell">
                                    <div className="flex items-center gap-4">
                                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                                        <CheckCircle2 className="w-6 h-6 text-white" aria-hidden="true" />
                                      </div>
                                      <span className="font-bold text-xl text-foreground">{course.language}</span>
                                    </div>
                                  </td>
                                  <td className="py-6 px-8" role="gridcell">
                                    <Badge variant="secondary" className="bg-gradient-to-r from-primary/20 to-primary/10 text-primary border-primary/30 text-lg px-4 py-2 font-semibold shadow-md">
                                      Level {course.level}
                                    </Badge>
                                  </td>
                                  <td className="py-6 px-8" role="gridcell">
                                    {course.ieltsScores ? (
                                      <Badge className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300 text-lg px-4 py-2 font-semibold shadow-md">
                                        {course.result}
                                      </Badge>
                                    ) : (
                                      <span className="text-muted-foreground text-lg">-</span>
                                    )}
                                  </td>
                                  <td className="py-6 px-8 text-lg font-semibold" role="gridcell">
                                    {new Date(course.certificateIssueDate).toLocaleDateString('en-GB')}
                                  </td>
                                  <td className="py-6 px-8" role="gridcell">
                                    <Badge variant="outline" className="text-amber-700 border-amber-400 bg-amber-50 text-lg px-4 py-2 font-semibold shadow-md">
                                      {new Date(course.certificateValidUntil).toLocaleDateString('en-GB')}
                                    </Badge>
                                  </td>
                                  <td className="py-6 px-8 text-center" role="gridcell">
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => setSelectedCourse(course as ExtendedCourse)}
                                          className="px-6 py-3 text-lg font-semibold border-2 border-primary/30 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                                          aria-label={`View certificate for ${course.language} ${course.level}`}
                                        >
                                          View Certificate
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto p-0 bg-gradient-to-br from-primary/5 via-white to-primary/10">
                                        <div className="relative overflow-hidden rounded-3xl">
                                          {/* Decorative background elements */}
                                          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/20 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
                                          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary/10 to-transparent rounded-full translate-y-16 -translate-x-16"></div>
                                          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-primary/5 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2"></div>

                                          <DialogHeader className="relative z-10 p-8 pb-4">
                                            <DialogTitle className="text-center text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent drop-shadow-sm">
                                              Certificate of Completion
                                            </DialogTitle>
                                          </DialogHeader>

                                          <div className="relative z-10 p-8 pt-4">
                                            <div className="bg-white/80 backdrop-blur-sm border-2 border-primary/20 rounded-3xl p-8 shadow-2xl">
                                              <div className="text-center space-y-8">
                                                {/* Institute Header */}
                                                <div className="text-center lg:text-left space-y-4">
                                                  {/* Main Institute Name */}
                                                  <div className="relative">
                                                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/70 bg-clip-text text-transparent mb-2 drop-shadow-sm">
                                                      European Language Institute
                                                    </h1>
                                                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                                                  </div>

                                                  {/* Certificate Title with Decorative Elements */}
                                                  <div className="relative">
                                                    <div className="flex items-center justify-center lg:justify-start gap-3">
                                                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
                                                        <Award className="w-4 h-4 text-white" />
                                                      </div>
                                                      <span className="text-lg font-bold text-primary uppercase tracking-wider">
                                                        Certificate of Completion
                                                      </span>
                                                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
                                                        <Award className="w-4 h-4 text-white" />
                                                      </div>
                                                    </div>
                                                    {/* Decorative underline */}
                                                    <div className="mt-2 flex justify-center lg:justify-start">
                                                      <div className="w-48 h-0.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-full"></div>
                                                    </div>
                                                  </div>

                                                  {/* Certification Type */}
                                                  <div className="flex items-center justify-center lg:justify-start gap-2">
                                                    <div className="px-4 py-1 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20">
                                                      <span className="text-sm font-semibold text-primary/80 uppercase tracking-wide">
                                                        Language Proficiency Certification
                                                      </span>
                                                    </div>
                                                  </div>
                                                </div>

                                                {/* Certificate Content */}
                                                <div className="bg-gradient-to-r from-primary/5 via-white to-primary/5 p-8 rounded-2xl border-2 border-primary/10 shadow-lg">
                                                  <div className="space-y-6 text-lg leading-relaxed">
                                                    <p className="text-foreground font-medium">
                                                      This certifies that <span className="font-bold text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">{displayStudent.studentName}</span>
                                                    </p>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                      <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                                                        <CreditCard className="w-6 h-6 text-blue-600" />
                                                        <div>
                                                          <div className="text-sm text-blue-600 font-semibold uppercase tracking-wide">Passport No</div>
                                                          <div className="font-mono font-bold text-lg text-blue-800">{displayStudent.passportNumber}</div>
                                                        </div>
                                                      </div>
                                                      <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
                                                        <Calendar className="w-6 h-6 text-green-600" />
                                                        <div>
                                                          <div className="text-sm text-green-600 font-semibold uppercase tracking-wide">Date of Birth</div>
                                                          <div className="font-bold text-lg text-green-800">{displayStudent.dateOfBirth}</div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <p className="text-foreground font-medium">
                                                      has successfully completed the <span className="font-bold text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">{course.language} {course.level}</span> course
                                                    </p>
                                                    <p className="text-foreground font-medium">
                                                      at the <span className="font-bold text-xl text-primary italic">European Language Institute</span>.
                                                    </p>
                                                  </div>
                                                </div>

                                                {/* Dates */}
                                                <div className="grid grid-cols-2 gap-6">
                                                  <div className="bg-gradient-to-br from-white to-primary/5 p-6 rounded-2xl border-2 border-primary/20   text-center">
                                                    <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
                                                    <div className="text-sm text-primary/70 font-semibold uppercase tracking-wide mb-2">Completion Date</div>
                                                    <div className="font-bold text-xl text-foreground">{new Date(course.certificateIssueDate).toLocaleDateString('en-GB')}</div>
                                                  </div>
                                                  <div className="bg-gradient-to-br from-white to-primary/5 p-6 rounded-2xl border-2 border-primary/20   text-center">
                                                    <Award className="w-8 h-8 text-primary mx-auto mb-3" />
                                                    <div className="text-sm text-primary/70 font-semibold uppercase tracking-wide mb-2">Valid Until</div>
                                                    <div className="font-bold text-xl text-foreground">{new Date(course.certificateValidUntil).toLocaleDateString('en-GB')}</div>
                                                  </div>
                                                </div>

                                                {/* Result Badge */}
                                                {course.ieltsScores && (
                                                  <div className="text-center py-4">
                                                    <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-400 to-green-600 border-2 border-green-500 rounded-full shadow-xl">
                                                      <CheckCircle2 className="w-6 h-6 text-white mr-3" />
                                                      <span className="font-bold text-xl text-white uppercase tracking-wide">{course.result}</span>
                                                    </div>
                                                  </div>
                                                )}

                                                {/* Signature and Certificate Info */}
                                                <div className="grid grid-cols-2 gap-6">
                                                  <div className="bg-gradient-to-br from-white to-primary/5 p-6 rounded-2xl border-2 border-primary/20   text-center">
                                                    <FileText className="w-8 h-8 text-primary mx-auto mb-3" />
                                                    <div className="text-sm text-primary/70 font-semibold uppercase tracking-wide mb-3">Digitally Signed By</div>
                                                    <div className="font-bold text-xl text-foreground italic mb-2">{displayStudent.digitalSignature}</div>
                                                    <div className="text-sm text-muted-foreground font-medium">Director, European Language Institute</div>
                                                  </div>
                                                  <div className="bg-gradient-to-br from-white to-primary/5 p-6 rounded-2xl border-2 border-primary/20   text-center">
                                                    <QrCode className="w-8 h-8 text-primary mx-auto mb-3" />
                                                    <div className="text-sm text-primary/70 font-semibold uppercase tracking-wide mb-3">Certificate ID</div>
                                                    <div className="font-mono font-bold text-lg bg-primary/10 px-4 py-2 rounded-xl border border-primary/20 text-foreground">
                                                      {displayStudent.certificateId}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                              {/* Download Button */}
                                              <div className="mt-8 flex justify-center">
                                                <Button
                                                  onClick={() => {
                                                    const printWindow = window.open('', '_blank');
                                                    if (printWindow) {
                                                      printWindow.document.write(`
                                                        <!DOCTYPE html>
                                                        <html>
                                                          <head>
                                                            <title>Certificate - ${displayStudent.studentName}</title>
                                                            <meta charset="UTF-8">
                                                            <style>
                                                              body {
                                                                font-family: 'Times New Roman', serif;
                                                                margin: 0;
                                                                padding: 40px;
                                                                background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                                                                color: #1f2937;
                                                              }
                                                              .certificate {
                                                                max-width: 800px;
                                                                margin: 0 auto;
                                                                padding: 60px;
                                                                background: white;
                                                               
                                                                box-shadow: 0 20px 60px rgba(37, 99, 235, 0.3);
                                                                position: relative;
                                                              }
                                                              .certificate::before {
                                                                content: '';
                                                                position: absolute;
                                                                top: -10px;
                                                                left: -10px;
                                                                right: -10px;
                                                                bottom: -10px;
                                                                background: linear-gradient(45deg, #2563eb, #3b82f6, #60a5fa, #93c5fd, #2563eb);
                                                                border-radius: 25px;
                                                                z-index: -1;
                                                              }
                                                              .header {
                                                                text-align: center;
                                                                margin-bottom: 50px;
                                                              }
                                                              .institute-name {
                                                                font-size: 42px;
                                                                font-weight: bold;
                                                                color: #2563eb;
                                                                margin-bottom: 15px;
                                                                text-shadow: 2px 2px 4px rgba(37, 99, 235, 0.2);
                                                              }
                                                              .certificate-title {
                                                                font-size: 32px;
                                                                color: #374151;
                                                                font-weight: bold;
                                                                margin-bottom: 30px;
                                                              }
                                                              .certificate-subtitle {
                                                                font-size: 20px;
                                                                color: #6b7280;
                                                                margin-bottom: 40px;
                                                                padding: 10px 20px;
                                                                background: linear-gradient(135deg, #dbeafe, #bfdbfe);
                                                                border-radius: 25px;
                                                                display: inline-block;
                                                              }
                                                              .content {
                                                                margin-bottom: 50px;
                                                                background: linear-gradient(135deg, #f8fafc, #f1f5f9);
                                                                padding: 40px;
                                                                border-radius: 15px;
                                                                border: 2px solid #e2e8f0;
                                                              }
                                                              .certificate-text {
                                                                font-size: 24px;
                                                                line-height: 1.8;
                                                                margin-bottom: 30px;
                                                                text-align: center;
                                                              }
                                                              .highlight {
                                                                font-weight: bold;
                                                                color: #2563eb;
                                                                font-size: 28px;
                                                              }
                                                              .info-grid {
                                                                display: grid;
                                                                grid-template-columns: 1fr 1fr;
                                                                gap: 30px;
                                                                margin: 40px 0;
                                                              }
                                                              .info-box {
                                                                background: white;
                                                                padding: 25px;
                                                                border-radius: 12px;
                                                                border: 2px solid #e2e8f0;
                                                                text-align: center;
                                                                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                                                              }
                                                              .info-label {
                                                                font-size: 14px;
                                                                color: #6b7280;
                                                                margin-bottom: 10px;
                                                                text-transform: uppercase;
                                                                font-weight: bold;
                                                              }
                                                              .info-value {
                                                                font-size: 18px;
                                                                font-weight: bold;
                                                                color: #1f2937;
                                                              }
                                                              .dates-grid {
                                                                display: grid;
                                                                grid-template-columns: 1fr 1fr;
                                                                gap: 30px;
                                                                margin: 50px 0;
                                                              }
                                                              .date-box {
                                                                background: white;
                                                                padding: 30px;
                                                                border-radius: 15px;
                                                                border: 2px solid #e2e8f0;
                                                                text-align: center;
                                                                box-shadow: 0 6px 20px rgba(0,0,0,0.1);
                                                              }
                                                              .date-label {
                                                                font-size: 16px;
                                                                color: #6b7280;
                                                                margin-bottom: 15px;
                                                                text-transform: uppercase;
                                                                font-weight: bold;
                                                              }
                                                              .date-value {
                                                                font-size: 22px;
                                                                font-weight: bold;
                                                                color: #1f2937;
                                                              }
                                                              .pass-section {
                                                                text-align: center;
                                                                margin: 40px 0;
                                                              }
                                                              .pass-badge {
                                                                display: inline-flex;
                                                                align-items: center;
                                                                background: linear-gradient(135deg, #16a34a, #15803d);
                                                                color: white;
                                                                padding: 20px 40px;
                                                                border-radius: 50px;
                                                                font-size: 24px;
                                                                font-weight: bold;
                                                                box-shadow: 0 8px 25px rgba(22, 163, 74, 0.3);
                                                              }
                                                              .signature-section {
                                                                display: grid;
                                                                grid-template-columns: 1fr 1fr;
                                                                gap: 40px;
                                                                margin-top: 60px;
                                                              }
                                                              .signature-box {
                                                                background: white;
                                                                padding: 30px;
                                                                border-radius: 15px;
                                                                border: 2px solid #e2e8f0;
                                                                text-align: center;
                                                                box-shadow: 0 6px 20px rgba(0,0,0,0.1);
                                                              }
                                                              .signature-label {
                                                                font-size: 16px;
                                                                color: #6b7280;
                                                                margin-bottom: 15px;
                                                                text-transform: uppercase;
                                                                font-weight: bold;
                                                              }
                                                              .signature-value {
                                                                font-size: 20px;
                                                                font-weight: bold;
                                                                color: #1f2937;
                                                              }
                                                              .certificate-id {
                                                                font-family: monospace;
                                                                background: #f8fafc;
                                                                padding: 15px;
                                                                border-radius: 8px;
                                                                border: 2px solid #e2e8f0;
                                                                margin-top: 15px;
                                                                font-size: 18px;
                                                              }
                                                            </style>
                                                          </head>
                                                          <body>
                                                            <div class="certificate">
                                                              <div class="header">
                                                                <h1 class="institute-name">European Language Institute</h1>
                                                                <h2 class="certificate-title">Certificate of Completion</h2>
                                                                <h3 class="certificate-subtitle">Language Proficiency Certification</h3>
                                                              </div>

                                                              <div class="content">
                                                                <p class="certificate-text">
                                                                  This certifies that <span class="highlight">${displayStudent.studentName}</span>,<br>
                                                                  <span class="info-value">${displayStudent.passportNumber}</span>,<br>
                                                                  born <span class="info-value">${displayStudent.dateOfBirth}</span>,<br>
                                                                  has successfully completed the <span class="highlight">${course.language} ${course.level}</span> course<br>
                                                                  at the European Language Institute.
                                                                </p>
                                                              </div>

                                                              <div class="dates-grid">
                                                                <div class="date-box">
                                                                  <div class="date-label">Completion Date</div>
                                                                  <div class="date-value">${new Date(course.certificateIssueDate).toLocaleDateString('en-GB')}</div>
                                                                </div>
                                                                <div class="date-box">
                                                                  <div class="date-label">Valid Until</div>
                                                                  <div class="date-value">${new Date(course.certificateValidUntil).toLocaleDateString('en-GB')}</div>
                                                                </div>
                                                              </div>

                                                              ${course.ieltsScores ? `
                                                              <div class="pass-section">
                                                                <div class="pass-badge">✓ ${course.result}</div>
                                                              </div>
                                                              ` : ''}

                                                              <div class="signature-section">
                                                                <div class="signature-box">
                                                                  <div class="signature-label">Digitally Signed By</div>
                                                                  <div class="signature-value">${displayStudent.digitalSignature}</div>
                                                                  <div style="font-size: 14px; color: #6b7280; margin-top: 8px;">Director, European Language Institute</div>
                                                                </div>
                                                                <div class="signature-box">
                                                                  <div class="signature-label">Certificate ID</div>
                                                                  <div class="certificate-id">${displayStudent.certificateId}</div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </body>
                                                        </html>
                                                      `);
                                                      printWindow.document.close();
                                                      printWindow.print();
                                                    }
                                                  }}
                                                  className="px-8 py-4 text-lg font-bold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white shadow-xl hover:shadow-2xl rounded-2xl transform hover:scale-105 transition-all duration-300"
                                                >
                                                  <FileText className="w-5 h-5 mr-2" />
                                                  Download Certificate
                                                </Button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </DialogContent>
                                      </Dialog>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-6 pt-8">
                        <Button
                          variant="outline"
                          onClick={handleReset}
                          className="flex-1 py-4 text-xl font-bold border-2 border-primary/30 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl rounded-2xl"
                          data-testid="button-verify-another"
                        >
                          Verify Another Certificate
                        </Button>
                        <Button
                          onClick={() => setSelectedCourse(displayStudent.courses[0] as ExtendedCourse)}
                          className="flex-1 py-4 text-xl font-bold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white shadow-xl hover:shadow-2xl rounded-2xl transform hover:scale-105 transition-all duration-300"
                          data-testid="button-print"
                        >
                          Print Certificate Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}

          {/* Help Text */}
          {!searchTriggered && (
            <Card className="border-card-border bg-muted/30">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 text-foreground">How to Verify</h3>
                <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Enter the student ID card number in the field above</li>
                  <li>Click the "Search" button to verify the certificate</li>
                  <li>View the student's completed courses and certificate details</li>
                  <li>Print the verification results if needed</li>
                </ol>
                <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm text-foreground">
                    <strong>Note:</strong> All certificates issued by European Language Institute can be verified through this system.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}



