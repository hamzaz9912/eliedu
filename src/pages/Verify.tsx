import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle2, XCircle, Award, Calendar, User, CreditCard, Shield, FileText, QrCode, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  gender: 'M' | 'F';
  countryOfOrigin: string;
  countryOfNationality: string;
  firstLanguage: string;
  testReportNumber: string;
  profileImage?: string;
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
    gender: "M",
    countryOfOrigin: "PAKISTAN",
    countryOfNationality: "PAKISTAN",
    firstLanguage: "URDU",
    testReportNumber: "ELIDE0089886",
    profileImage: "https://res.cloudinary.com/dl17n8mof/image/upload/v1761077185/fateh_uxfnfv.jpg",
    issuingInstitute: "European Language Institute",
    digitalSignature: "Albrecht",
    certificateId: "STU20240022",
    courses: [
      {
        language: "Deutsch",
        level: "A1",
        certificateIssueDate: "2025-10-21",
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
    gender: "M",
    countryOfOrigin: "PAKISTAN",
    countryOfNationality: "PAKISTAN",
    firstLanguage: "URDU",
    testReportNumber: "ELIDE0012347",
    profileImage: "https://res.cloudinary.com/dl17n8mof/image/upload/v1761077185/Sajjad_lz48zq.jpg",
    issuingInstitute: "European Language Institute",
    digitalSignature: "Albrecht",
    certificateId: "STU20240023",
    courses: [
      {
        language: "Deutsch",
        level: "A1",
        certificateIssueDate: "2025-10-21",
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
  {
    id: "AV320T262",
    studentName: "Anna Elias",
    passportNumber: "AV320T262",
    dateOfBirth: "28 Jun 1995",
    gender: "F",
    countryOfOrigin: "FRANCE",
    countryOfNationality: "FRANCE",
    firstLanguage: "FRENCH",
    testReportNumber: "ELIFR0012345",
    profileImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDE1MCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9Ijc1IiB5PSI5MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOUI5QkE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkFubmE8L3RleHQ+Cjx0ZXh0IHg9Ijc1IiB5PSIxMDUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzlCOUJBNCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RWxpYXM8L3RleHQ+Cjwvc3ZnPgo=",
    issuingInstitute: "European Language Institute",
    digitalSignature: "Albrecht",
    certificateId: "ELIFR00189235",
    courses: [
      {
        language: "French",
        level: "C1",
        certificateIssueDate: "2025-10-21",
        certificateValidUntil: "2026-10-21",
        result: "Pass",
        ieltsScores: {
          listening: "7.5",
          reading: "8.0",
          writing: "7.0",
          speaking: "7.5",
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

  const handleSearch = (e: React.FormEvent) =>
    e.preventDefault();
    if (idNumber.trim()) {
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
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-16 sm:py-20 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full px-4 py-2 mb-6">
            <Shield className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium text-gold-foreground">Official Verification</span>
          </div>

          <div className="flex justify-center mb-6">
            <div className="relative">
              <Award className="w-20 h-20 text-gold animate-float" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-gold-foreground" />
              </div>
            </div>
          </div>

          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl mb-6">
            Verify Student Certificate
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
            Instantly verify the authenticity of European Language Institute certificates with our secure verification system
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-primary-foreground/80">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold" />
              <span className="text-sm">Secure Verification</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold" />
              <span className="text-sm">Instant Results</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold" />
              <span className="text-sm">Official Records</span>
            </div>
          </div>
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
      Please enter the student ID card number (e.g., STU2024001)
    </CardDescription>
    {/* Search ID Image */}
    <div className="flex justify-center mt-4">
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center border-2 border-primary/30">
          <Search className="w-8 h-8 text-primary" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gold rounded-full flex items-center justify-center border-2 border-white">
          <Sparkles className="w-3 h-3 text-gold-foreground" />
        </div>
      </div>
    </div>
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
                      className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                      disabled={!idNumber.trim() || isLoading}
                      data-testid="button-search"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"></div>
                          Searching...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Search className="w-4 h-4" />
                          Verify Certificate
                          <Shield className="w-4 h-4" />
                        </div>
                      )}
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
                  <Card className="border-card-border">
                    <CardHeader className="bg-muted/30">
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                        <CardTitle className="text-2xl">Certificate Verified</CardTitle>
                      </div>
                      <CardDescription>
                        This certificate has been issued by European Language Institute
                      </CardDescription>
                      {/* Student Profile Image */}
                      {displayStudent.profileImage && (
                        <div className="flex justify-center mt-4">
                          <div className="relative">
                            <img
                              src={displayStudent.profileImage}
                              alt={`${displayStudent.studentName} Profile`}
                              className="w-24 h-24 rounded-full border-4 border-primary/20 shadow-lg object-cover"
                            />
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      {/* Student Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-primary" />
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
                                                    <div className="font-bold text-xl text-foreground">{new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleDateString('en-GB')}</div>
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
                                                          <html lang="en">
                                                          <head>
                                                              <meta charset="UTF-8">
                                                              <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                                              <title>European Languages Institute - Test Report Form</title>
                                                              <style>
                                                                  @page { size: A4; margin: 0; }
                                                                  body {
                                                                      font-family: Arial, sans-serif;
                                                                      font-size: 10pt;
                                                                      margin: 0;
                                                                      padding: 5px;
                                                                      box-sizing: border-box;
                                                                      background-color: white;
                                                                      display: flex;
                                                                      justify-content: center;
                                                                      align-items: flex-start;
                                                                      min-height: 100vh;
                                                                  }

                                                                  .container {
                                                                      width: 100%;
                                                                      max-width: 794px; /* A4 width in pixels at 96 DPI */
                                                                      margin: 0 auto;
                                                                      border: 2px solid #1e40af;
                                                                      border-radius: 8px;
                                                                      padding: 15px;
                                                                      background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
                                                                      box-shadow: 0 4px 16px rgba(30, 64, 175, 0.1);
                                                                      page-break-inside: avoid;
                                                                  }

                                                                  @page {
                                                                      size: A4;
                                                                      margin: 0;
                                                                  }

                                                                  @media print {
                                                                      body {
                                                                          padding: 0;
                                                                          min-height: auto;
                                                                      }
                                                                      .container {
                                                                          margin: 0;
                                                                          border: 2px solid #1e40af;
                                                                          box-shadow: none;
                                                                      }
                                                                  }

                                                                  .header {
                                                                      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
                                                                      color: white;
                                                                      padding: 15px;
                                                                      border-radius: 8px;
                                                                      margin-bottom: 20px;
                                                                  }

                                                                  .header-left h1 {
                                                                      color: white;
                                                                      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                                                                      margin: 0;
                                                                  }

                                                                  .header-right .module-box {
                                                                      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                                                                      color: white;
                                                                      border: 2px solid #047857;
                                                                      box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
                                                                      padding: 8px 15px;
                                                                      border-radius: 6px;
                                                                  }
 
                                                                  /* --- Header Section --- */
                                                                  .header {
                                                                      display: flex;
                                                                      justify-content: space-between;
                                                                      align-items: center;
                                                                      border-bottom: 2px solid #ccc;
                                                                      padding-bottom: 10px;
                                                                      margin-bottom: 15px;
                                                                  }
 
                                                                  .header-left h1 {
                                                                      font-size: 24pt;
                                                                      font-weight: bold;
                                                                      color: #000;
                                                                      margin: 0;
                                                                  }
 
                                                                  .header-right {
                                                                      text-align: right;
                                                                      font-size: 12pt;
                                                                      font-weight: bold;
                                                                  }
 
                                                                  /* --- Box Styling --- */
                                                                  .input-box {
                                                                      display: inline-block;
                                                                      border: 1px solid #000;
                                                                      padding: 3px;
                                                                      min-width: 100px;
                                                                      height: 8px;
                                                                      text-align: left;
                                                                      margin-right: 8px;
                                                                      background-color: #f0f0f0; /* Light grey background for input areas */
                                                                      font-size: 9pt;
                                                                  }
 
                                                                  .label {
                                                                      font-size: 8pt;
                                                                      color: #555;
                                                                      margin-bottom: 2px;
                                                                      display: block;
                                                                  }
 
                                                                  .row {
                                                                      display: flex;
                                                                      align-items: flex-start;
                                                                      margin-bottom: 10px;
                                                                  }
 
                                                                  .row-item {
                                                                      display: flex;
                                                                      flex-direction: column;
                                                                      margin-right: 20px;
                                                                  }
 
                                                                  .half-row {
                                                                      width: 50%;
                                                                  }
 
                                                                  /* --- Note and Module --- */
                                                                  .note {
                                                                      font-size: 8pt;
                                                                      margin-bottom: 20px;
                                                                  }
 
                                                                  .module-box {
                                                                      border: 1px solid #000;
                                                                      padding: 5px 15px;
                                                                      font-weight: bold;
                                                                      display: inline-block;
                                                                      margin-left: auto;
                                                                  }
 
                                                                  /* --- Candidate Details and Test Results Section --- */
                                                                  .section-heading {
                                                                      font-size: 12pt;
                                                                      font-weight: bold;
                                                                      margin-bottom: 8px;
                                                                      border-bottom: 1px solid #000;
                                                                      padding-bottom: 3px;
                                                                  }
 
                                                                  .candidate-details {
                                                                      border: 1px solid #000;
                                                                      display: flex;
                                                                      margin-bottom: 20px;
                                                                  }
 
                                                                  .details-column {
                                                                      flex-grow: 1;
                                                                      padding: 10px;
                                                                  }
 
                                                                  .photo-area {
                                                                      width: 150px;
                                                                      height: 180px;
                                                                      border-left: 1px solid #000;
                                                                      background-color: #eee;
                                                                      text-align: center;
                                                                      line-height: 180px;
                                                                      font-size: 8pt;
                                                                      color: #555;
                                                                      overflow: hidden; /* To ensure the image stays within bounds */
                                                                  }
 
                                                                  .photo-area img {
                                                                      width: 100%;
                                                                      height: 100%;
                                                                      object-fit: cover; /* Ensures the image fills the area */
                                                                      display: block;
                                                                  }
 
                                                                  .detail-line {
                                                                      display: flex;
                                                                      align-items: center;
                                                                      margin-bottom: 5px;
                                                                  }
 
                                                                  .detail-label {
                                                                      width: 150px;
                                                                      font-weight: bold;
                                                                  }
 
                                                                  .result-table {
                                                                      width: 100%;
                                                                      border-collapse: collapse;
                                                                      margin-bottom: 20px;
                                                                  }
 
                                                                  .result-table th, .result-table td {
                                                                      border: 1px solid #000;
                                                                      padding: 8px;
                                                                      text-align: center;
                                                                      font-weight: bold;
                                                                  }
 
                                                                  .result-table th {
                                                                      background-color: #f0f0f0;
                                                                      font-weight: normal;
                                                                  }
 
                                                                  /* --- Administrator and Stamp Area --- */
                                                                  .admin-section {
                                                                      display: flex;
                                                                      margin-top: 12px;
                                                                  }
 
                                                                  .admin-comments {
                                                                      width: 40%;
                                                                      border: 1px solid #000;
                                                                      min-height: 150px;
                                                                      padding: 10px;
                                                                      box-sizing: border-box;
                                                                      margin-right: 20px;
                                                                  }
 
                                                                  .center-stamp-area {
                                                                      width: 30%;
                                                                      border: 1px solid #000;
                                                                      min-height: 150px;
                                                                      margin-right: 20px;
                                                                      display: flex;
                                                                      flex-direction: column;
                                                                      justify-content: center;
                                                                      align-items: center;
                                                                      padding: 5px;
                                                                      box-sizing: border-box;
                                                                      text-align: center;
                                                                  }
 
                                                                  .validation-stamp-area {
                                                                      width: 30%;
                                                                      border: 1px solid #000;
                                                                      min-height: 150px;
                                                                      display: flex;
                                                                      flex-direction: column;
                                                                      justify-content: space-around;
                                                                      align-items: center;
                                                                  }

                                                                  /* Validation Stamp Styles */
                                                                  .eliedu-stamp-container {
                                                                      position: relative;
                                                                      width: 140px;
                                                                      height: 140px;
                                                                  }

                                                                  .stamp-svg-ring {
                                                                      stroke: #1e40af; /* Royal Blue */
                                                                      fill: none;
                                                                  }

                                                                  .stamp-svg-bar {
                                                                      fill: #eab308; /* Elegant Gold */
                                                                      stroke: #1e40af;
                                                                      stroke-width: 1;
                                                                  }

                                                                  .stamp-svg-center-text {
                                                                      fill: #1e40af; /* Royal Blue */
                                                                      font-family: Arial, sans-serif;
                                                                      font-size: 12pt;
                                                                      font-weight: bold;
                                                                      text-anchor: middle;
                                                                      dominant-baseline: central;
                                                                  }

                                                                  .stamp-svg-text {
                                                                      fill: #eab308; /* Elegant Gold */
                                                                      font-family: Arial, sans-serif;
                                                                      font-size: 8pt;
                                                                      font-weight: bold;
                                                                  }

                                                                  .stamp-svg-stars {
                                                                      fill: #eab308; /* Elegant Gold */
                                                                      font-size: 10pt;
                                                                      text-anchor: middle;
                                                                  }

                                                                  .stamp-svg-line {
                                                                      stroke: #eab308; /* Elegant Gold */
                                                                      stroke-width: 1;
                                                                  }
 
                                                                  .stamp-placeholder {
                                                                      width: 100px;
                                                                      height: 100px;
                                                                      border: 2px dashed #000;
                                                                      border-radius: 50%;
                                                                      text-align: center;
                                                                      line-height: 100px;
                                                                      font-size: 8pt;
                                                                      font-weight: bold;
                                                                      color: #000;
                                                                  }
 
                                                                  /* --- Footer --- */
                                                                  .signature-area {
                                                                      display: flex;
                                                                      justify-content: flex-end;
                                                                      margin-top: 8px;
                                                                  }
 
                                                                  .signature-box {
                                                                      width: 200px;
                                                                      text-align: center;
                                                                      padding-top: 20px;
                                                                  }
 
                                                                  .signature-line {
                                                                      border-bottom: 1px solid #000;
                                                                      height: 30px; /* Space for the signature image */
                                                                      margin-bottom: 5px;
                                                                      position: relative;
                                                                  }
 
                                                                  .test-report-number {
                                                                      display: flex;
                                                                      justify-content: flex-end;
                                                                      margin-top: 12px;
                                                                  }
 
                                                                  .test-report-box {
                                                                      display: flex;
                                                                      align-items: center;
                                                                  }
 
                                                                  .test-report-box .input-box {
                                                                      background-color: white;
                                                                      min-width: 150px;
                                                                      text-align: center;
                                                                      font-weight: bold;
                                                                  }
 
                                                                  .logos {
                                                                      display: flex;
                                                                      justify-content: space-around;
                                                                      align-items: center;
                                                                      border-top: 2px solid #000;
                                                                      padding-top: 8px;
                                                                      margin-top: 20px;
                                                                  }
 
                                                                  .logo-placeholder {
                                                                      font-size: 10pt;
                                                                      font-weight: bold;
                                                                      height: 40px;
                                                                      line-height: 40px;
                                                                      text-align: center;
                                                                  }
 
                                                                  .footer-note {
                                                                      font-size: 7pt;
                                                                      text-align: center;
                                                                      margin-top: 10px;
                                                                  }
 
                                                                  /* --- Content in Boxes --- */
                                                                  .content {
                                                                      font-weight: bold;
                                                                      color: #000;
                                                                  }
 
                                                              </style>
                                                          </head>
                                                          <body>
                                                              <div class="container">
                                                                  <div class="header">
                                                                      <div class="header-left">
                                                                          <h1>EUROPEAN LANGUAGES INSTITUTE</h1>
                                                                          <div style="font-size: 14pt; margin-top: 5px;">Test Report Form</div>
                                                                      </div>
                                                                      <div class="header-right">
                                                                      Language Skill: 
                                                                          <div class="module-box"><strong>${course.language}</strong></div>
                                                                      </div>
                                                                  </div>
 
                                                                  <div class="note">
                                                                      NOTE: This Test Report Form serves as an official record of a candidate’s proficiency in Listening, Reading, Writing, and Speaking. Candidates are encouraged to prepare thoroughly for all four components to demonstrate balanced language competence. Admission to undergraduate and postgraduate programs should consider overall performance across these modules. It is strongly recommended that candidates review the Test Report Form Guide before submission and verify the authenticity of their results through the official validation portal.
                                                                  </div>
 
                                                                  <div class="row">
                                                                      <div class="row-item">
                                                                          Centre Number:
                                                                          <div class="input-box"><span class="content">EL001</span></div>
                                                                      </div>
                                                                      <div class="row-item">
                                                                          Date:
                                                                          <div class="input-box"><span class="content">${new Date(course.certificateIssueDate).toLocaleDateString('en-GB')}</span></div>
                                                                      </div>
                                                                      <div class="row-item" style="margin-left: auto;">
                                                                          Candidate Number:
                                                                          <div class="input-box" style="min-width: 150px;"><span class="content">${displayStudent.certificateId.slice(-6)}</span></div>
                                                                      </div>
                                                                  </div>
 
                                                                  <div class="section-heading">Candidate Details</div>
                                                                  <div class="candidate-details">
                                                                      <div class="details-column">
                                                                          <div class="detail-line">
                                                                              <div class="detail-label">Family Name:</div>
                                                                              <div class="input-box" style="flex-grow: 1;"><span class="content">${displayStudent.studentName.split(' ')[1] || displayStudent.studentName}</span></div>
                                                                          </div>
                                                                          <div class="detail-line">
                                                                              <div class="detail-label">First Name:</div>
                                                                              <div class="input-box" style="flex-grow: 1;"><span class="content">${displayStudent.studentName.split(' ')[0]}</span></div>
                                                                          </div>
                                                                          <div class="detail-line">
                                                                              <div class="detail-label">Candidate ID:</div>
                                                                              <div class="input-box" style="width: 250px;"><span class="content">${displayStudent.passportNumber}</span></div>
                                                                          </div>
                                                                      </div>
                                                                      <div class="photo-area">
                                                                          ${displayStudent.profileImage ? `<img src="${displayStudent.profileImage}" alt="${displayStudent.studentName} Profile Photo">` : `<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDE1MCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9Ijc1IiB5PSI5MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOUI5QkE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkNhbmRpZGF0ZTwvdGV4dD4KPHRleHQgeD0iNzUiIHk9IjEwNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSIjOUI5QkE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5QaG90byBQbGFjZWhvbGRlcjwvdGV4dD4KPHN2Zz4=" alt="Candidate Profile Photo">`}
                                                                      </div>
                                                                  </div>
 
                                                                  <div class="row">
                                                                      <div class="row-item">
                                                                          Date of Birth:
                                                                          <div class="input-box"><span class="content">${displayStudent.dateOfBirth}</span></div>
                                                                      </div>
                                                                      <div class="row-item">
                                                                          Sex (M/F):
                                                                          <div class="input-box" style="width: 30px;"><span class="content">${displayStudent.gender}</span></div>
                                                                      </div>
                                                                      <div class="row-item">
                                                                          Scheme Code:
                                                                          <div class="input-box"><span class="content">Private Candidate</span></div>
                                                                      </div>
                                                                  </div>
 
                                                                  <div class="row">
                                                                      <div class="half-row row-item">
                                                                          Country or Region of Origin:
                                                                          <div class="input-box" style="width: 90%;"><span class="content">${displayStudent.countryOfOrigin}</span></div>
                                                                      </div>
                                                                      <div class="half-row row-item">
                                                                          Country of Nationality:
                                                                          <div class="input-box" style="width: 90%;"><span class="content">${displayStudent.countryOfNationality}</span></div>
                                                                      </div>
                                                                  </div>
 
                                                                  <div class="row">
                                                                      <div class="half-row row-item">
                                                                          First Language:
                                                                          <div class="input-box" style="width: 90%;"><span class="content">${displayStudent.firstLanguage}</span></div>
                                                                      </div>
                                                                  </div>
 
                                                                  <div class="section-heading">Test Results</div>
                                                                  <table class="result-table">
                                                                      <thead>
                                                                          <tr>
                                                                              <th><strong>Listening</strong></th>
                                                                              <th><strong>Reading</strong></th>
                                                                              <th><strong>Writing</strong></th>
                                                                              <th><strong>Speaking</strong></th>
                                                                              <th><strong>CEFR Level</strong></th>
                                                                          </tr>
                                                                      </thead>
                                                                      <tbody>
                                                                          <tr>
                                                                              <td><span class="content">A1</span></td>
                                                                              <td><span class="content">A1</span></td>
                                                                              <td><span class="content">A1</span></td>
                                                                              <td><span class="content">A1</span></td>
                                                                              <td><span class="content">${course.level}</span></td>
                                                                          </tr>
                                                                      </tbody>
                                                                  </table>
 
                                                                  <div class="admin-section">
                                                                      <div class="admin-comments">
                                                                          <div class="label">Administrator Comments</div>
                                                                      </div>
                                                                      <div class="center-stamp-area">
                                                                          <div class="label">Centre stamp</div>
                                                                          <div class="lder">
                                                                              <img src="https://res.cloudinary.com/dl17n8mof/image/upload/v1761079435/centre_stemp_qzl5zf.png" alt="" style="max-width: 100%; max-height: 100%; object-fit: contain;">
                                                                          </div>
                                                                      </div>
                                                                      <div class="validation-stamp-area">
                <div class="label" style="font-size: 10pt; font-weight: bold;">Validation stamp</div>
                <img src="https://res.cloudinary.com/dl17n8mof/image/upload/v1761077785/stemp_ufream.png" alt="Validation Stamp" style="max-width: 100%; max-height: 100%; object-fit: contain;">
                </div>
        </div>

                                                                  <div class="signature-area">
                                                                      <div class="row-item" style="margin-right: 50px;">
                                                                          <div class="label">Date</div>
                                                                          <div class="input-box" style="width: 150px; background-color: white;"><span class="content">${new Date(course.certificateIssueDate).toLocaleDateString('en-GB')}</span></div>
                                                                      </div>
                                                                      <div class="row-item">
                                                                          <div class="label">Administrator's Signature</div>
                                                                          <div class="signature-line">
                                                                              <img src="https://res.cloudinary.com/dl17n8mof/image/upload/v1761077785/sign_rn79om.png" alt="Administrator's Signature" style="position: absolute; bottom: 0; left: 0; width: 100%; height: 100%; object-fit: contain;">
                                                                          </div>
                                                                      </div>
                                                                  </div>
 
                                                                  <div class="test-report-number">
                                                                      <div class="test-report-box">
                                                                          Test Report Form Number:
                                                                          <div class="input-box"><span class="content">${displayStudent.testReportNumber}</span></div>
                                                                      </div>
                                                                  </div>
 
                                                                  <div class="logos">
                                                                      <div class="logo-placeholder">EUROPEAN LANGUAGES INSTITUTE</div>
                                                                      <div class="logo-placeholder">ELIEDU ASSESSMENT</div>
                                                                      <div class="logo-placeholder"></div>
                                                                  </div>
 
                                                                  <div class="footer-note">
                                                                      The validity of this Test Report Form can be verified online by recognising organisations at https://www.eliedu.eu/verify
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
                          onClick={() => window.print()}
                          className="flex-1 bg-primary text-primary-foreground hover:bg-primary"
                          data-testid="button-print"
                        >
                          <FileText className="w-4 h-4 mr-2" />
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





