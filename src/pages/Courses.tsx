import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageCircle, Clock, Star, Award, Users, BookOpen, Target, Sparkles, CheckCircle2, ArrowRight, Globe, Upload, X, Calendar, Phone, Mail, MapPin, FileText } from "lucide-react";
import { INSTITUTE_INFO, courseRegistrationSchema, type CourseRegistration } from "@shared/schema";
import { useState } from "react";

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationData, setRegistrationData] = useState<Partial<CourseRegistration>>({
    selectedCourses: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [idDocumentPreview, setIdDocumentPreview] = useState<string | null>(null);

  const countryCodes = [
    { code: "+971", name: "UAE" },
    { code: "+1", name: "USA" },
    { code: "+44", name: "UK" },
    { code: "+49", name: "Germany" },
    { code: "+33", name: "France" },
    { code: "+34", name: "Spain" },
    { code: "+39", name: "Italy" },
  ];

  const courses = [
    {
      id: "french",
      language: "French",
      code: "FR",
      color: "bg-blue-600",
      levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
      duration: "12 weeks per level",
      description: "Master the language of diplomacy and culture. Our French courses cover grammar, conversation, and cultural insights from beginner to advanced levels.",
      whatsappMessage: "I'm interested in French language courses",
    },
    {
      id: "german",
      language: "German",
      code: "DE",
      color: "bg-gray-800",
      levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
      duration: "12 weeks per level",
      description: "Learn the language of innovation and precision. Our comprehensive German program prepares you for work, study, or travel in German-speaking countries.",
      whatsappMessage: "I'm interested in German language courses",
    },
    {
      id: "spanish",
      language: "Spanish",
      code: "ES",
      color: "bg-red-600",
      levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
      duration: "12 weeks per level",
      description: "Discover the beauty of Spanish language and culture. From basic conversation to advanced proficiency, we'll guide you through your Spanish journey.",
      whatsappMessage: "I'm interested in Spanish language courses",
    },
    {
      id: "italian",
      language: "Italian",
      code: "IT",
      color: "bg-green-600",
      levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
      duration: "12 weeks per level",
      description: "Experience the romance of Italian language. Our courses emphasize communication skills while exploring Italy's rich cultural heritage.",
      whatsappMessage: "I'm interested in Italian language courses",
    },
    {
      id: "english",
      language: "English",
      code: "EN",
      color: "bg-primary",
      levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
      duration: "12 weeks per level",
      description: "Excel in the global language of business and communication. Our English courses cover all skills: speaking, listening, reading, and writing.",
      whatsappMessage: "I'm interested in English language courses",
    },
  ];

  const handleWhatsAppClick = (message: string) => {
    const phone = INSTITUTE_INFO.contact.whatsapp.replace(/[^0-9]/g, "");
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIdDocument(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setIdDocumentPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Convert to base64 for storage
      const base64Reader = new FileReader();
      base64Reader.onload = (e) => {
        setRegistrationData(prev => ({
          ...prev,
          idDocument: e.target?.result as any
        }));
      };
      base64Reader.readAsDataURL(file);
    }
  };

  const handleCourseSelection = (courseId: string, checked: boolean) => {
    setRegistrationData(prev => ({
      ...prev,
      selectedCourses: checked
        ? [...(prev.selectedCourses || []), courseId]
        : (prev.selectedCourses || []).filter(id => id !== courseId)
    }));
  };

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const validationResult = courseRegistrationSchema.safeParse(registrationData);

      if (!validationResult.success) {
        setSubmitMessage("Please fill in all required fields correctly.");
        return;
      }

      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validationResult.data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage("Registration submitted successfully! We'll review your application and get back to you soon.");
        setRegistrationData({ selectedCourses: [] });
        setIdDocument(null);
        setIdDocumentPreview(null);
        setTimeout(() => setShowRegistrationForm(false), 2000);
      } else {
        setSubmitMessage(result.error || "Failed to submit registration.");
      }
    } catch (error) {
      setSubmitMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground overflow-hidden py-20 sm:py-32">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent animate-pulse"></div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gold/20 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-primary-foreground/10 rounded-full blur-lg animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-gold/15 rounded-full blur-md animate-bounce"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Premium badge */}
          <div className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-gold animate-pulse" />
            <span className="text-sm font-medium text-gold-foreground">Premium Language Programs</span>
          </div>

          <h1 className="font-bold text-4xl sm:text-5xl md:text-7xl mb-6 leading-tight">
            Our Language
            <span className="block text-gold mt-2 animate-pulse">Courses</span>
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Comprehensive language training programs designed to help you achieve fluency.
            All courses follow the internationally recognized CEFR standards with expert native instructors.
          </p>

          {/* Course stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-8 text-primary-foreground/80">
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">5</div>
              <div className="text-sm">Languages Offered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">6</div>
              <div className="text-sm">CEFR Levels Each</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">12</div>
              <div className="text-sm">Weeks Per Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">100%</div>
              <div className="text-sm">Practical Focus</div>
            </div>
          </div>

          {/* Quick filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['All', 'Beginner (A1-A2)', 'Intermediate (B1-B2)', 'Advanced (C1-C2)'].map((filter) => (
              <button
                key={filter}
                className="px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full text-sm font-medium text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Courses Grid */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-gold/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl animate-pulse"></div>

        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-gold/30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-gold/40 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section intro */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Choose Your Language</span>
            </div>
            <h2 className="font-bold text-3xl sm:text-5xl mb-4 text-foreground">
              Comprehensive Course Offerings
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select from our premium language programs, each designed to take you from beginner to advanced proficiency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Card
                key={course.id}
                className={`group relative overflow-hidden border-0 bg-gradient-to-br from-white to-primary/5 shadow-xl hover:shadow-2xl hover:shadow-primary/15 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer ${
                  selectedCourse === course.id ? 'ring-4 ring-primary/50 scale-105' : ''
                }`}
                onClick={() => setSelectedCourse(selectedCourse === course.id ? null : course.id)}
                data-testid={`card-course-${course.id}`}
              >
                {/* Animated background gradients */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Animated border */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-gold to-primary opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-lg blur-sm"></div>

                <CardHeader className="text-center pb-6 relative z-10">
                  {/* Enhanced language icon */}
                  <div className="relative mb-6">
                    <div className={`w-28 h-28 mx-auto rounded-3xl ${course.color} flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 transform`}>
                      <span className="text-white font-bold text-4xl drop-shadow-lg">{course.code}</span>
                    </div>

                    {/* Floating accent elements */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold/30 rounded-full blur-sm group-hover:bg-gold/50 transition-colors duration-300 animate-pulse"></div>
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-primary/20 rounded-full group-hover:bg-primary/40 transition-colors duration-300"></div>
                  </div>

                  <h2 className="font-bold text-3xl text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                    {course.language}
                  </h2>

                  {/* Course rating */}
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">(4.9/5)</span>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 space-y-6 relative z-10 px-8">
                  {/* CEFR Levels with progress visualization */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground text-center">CEFR Levels</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {course.levels.map((level, index) => (
                        <Badge
                          key={level}
                          variant="secondary"
                          className={`text-sm px-3 py-1 transition-all duration-300 ${
                            selectedCourse === course.id ? 'bg-primary text-primary-foreground scale-110' : ''
                          }`}
                          data-testid={`badge-level-${level}`}
                        >
                          {level}
                        </Badge>
                      ))}
                    </div>

                    {/* Progress visualization */}
                    <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-2 bg-gradient-to-r from-primary to-gold rounded-full transition-all duration-700 group-hover:scale-y-125"
                        style={{ width: `${((course.levels.length) / 6) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Course details */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-muted-foreground justify-center bg-primary/5 rounded-lg p-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <span className="font-medium">{course.duration}</span>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                      {course.description}
                    </p>
                  </div>

                  {/* Course features */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">Native instructors</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">Interactive learning</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">Certificate included</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-6 pb-8 px-8 relative z-10">
                  <div className="w-full space-y-3">
                    <Button
                      className={`w-full gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                        selectedCourse === course.id
                          ? 'bg-gradient-to-r from-primary to-gold text-white'
                          : 'bg-gold text-gold-foreground hover:bg-gold/90'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCourse(course.id);
                        setRegistrationData(prev => ({
                          ...prev,
                          selectedCourses: [course.id]
                        }));
                        setShowRegistrationForm(true);
                      }}
                      data-testid={`button-enroll-${course.id}`}
                    >
                      <FileText className="w-5 h-5" />
                      Register for this Course
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full gap-2 border-primary/20 text-primary hover:bg-primary/5"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWhatsAppClick(course.whatsappMessage);
                      }}
                    >
                      <MessageCircle className="w-4 h-4" />
                      Quick Inquiry
                    </Button>
                  </div>
                </CardFooter>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                {/* Corner decorations */}
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-primary/20 group-hover:border-gold/40 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-primary/20 group-hover:border-gold/40 transition-colors duration-300"></div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-gold/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced What's Included Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-primary/5 via-background to-gold/5 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-gold/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-primary/10 to-transparent rounded-full blur-3xl animate-pulse"></div>

        {/* Floating elements */}
        <div className="absolute top-24 right-12 w-8 h-8 border-2 border-primary/20 rotate-45 animate-float"></div>
        <div className="absolute top-48 left-16 w-6 h-6 bg-gold/20 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-36 right-24 w-10 h-10 border border-gold/30 rounded-lg rotate-12 animate-float" style={{ animationDelay: '0.8s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-5xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gold/10 rounded-full px-4 py-2 mb-4">
                <Award className="w-4 h-4 text-gold" />
                <span className="text-sm font-medium text-gold-foreground">Complete Package</span>
              </div>
              <h2 className="font-bold text-4xl sm:text-6xl mb-6 text-foreground leading-tight">
                Everything You Need to
                <span className="block bg-gradient-to-r from-primary via-gold to-primary bg-clip-text text-transparent animate-shimmer">
                  Succeed
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Our comprehensive language learning packages include everything you need for successful language acquisition,
                from expert instruction to certification.
              </p>
            </div>

            {/* Enhanced features grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <Card className="group border-0 bg-gradient-to-br from-white to-primary/5 shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 transform hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-gold/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                        Certified Native Instructors
                      </h3>
                      <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                        Learn from qualified native speakers with extensive teaching experience and deep cultural knowledge.
                        Our instructors are certified language professionals who understand the nuances of effective language instruction.
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">100% native speakers</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group border-0 bg-gradient-to-br from-white to-gold/5 shadow-xl hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500 transform hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-primary/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <BookOpen className="w-8 h-8 text-gold" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-3 text-foreground group-hover:text-gold transition-colors duration-300">
                        Comprehensive Course Materials
                      </h3>
                      <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                        Access premium textbooks, interactive digital resources, audio materials, and practice exercises.
                        All materials are regularly updated to reflect current language usage and cultural contexts.
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold" />
                        <span className="text-sm text-muted-foreground">Digital + physical resources</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group border-0 bg-gradient-to-br from-white to-primary/5 shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 transform hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-gold/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Award className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                        Official CEFR Certificates
                      </h3>
                      <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                        Receive internationally recognized certificates upon successful completion of each level.
                        Our certificates are accepted by universities, employers, and immigration authorities worldwide.
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">Globally recognized</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group border-0 bg-gradient-to-br from-white to-gold/5 shadow-xl hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500 transform hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-primary/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Target className="w-8 h-8 text-gold" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-3 text-foreground group-hover:text-gold transition-colors duration-300">
                        Flexible Learning Schedule
                      </h3>
                      <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                        Choose from multiple class timings including morning, evening, and weekend sessions.
                        Our flexible scheduling accommodates working professionals and students with busy lifestyles.
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold" />
                        <span className="text-sm text-muted-foreground">Multiple time slots available</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Call to action */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-3 mb-6">
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">Ready to Begin Your Language Journey?</span>
              </div>

              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of successful language learners who have transformed their lives through our comprehensive programs
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-gradient-to-r from-primary to-gold hover:from-primary/90 hover:to-gold/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-4 transform hover:scale-105">
                  <BookOpen className="mr-2 w-5 h-5" />
                  Browse All Courses
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-4 transform hover:scale-105">
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Get Free Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      <Dialog open={showRegistrationForm} onOpenChange={setShowRegistrationForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Course Registration Form
            </DialogTitle>
            <p className="text-muted-foreground text-center">
              Please fill in your details to register for the selected course(s)
            </p>
          </DialogHeader>

          <form onSubmit={handleRegistrationSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={registrationData.fullName || ''}
                    onChange={(e) => setRegistrationData(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={registrationData.email || ''}
                    onChange={(e) => setRegistrationData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="flex gap-2">
                    <Select
                      value={registrationData.countryCode || '+971'}
                      onValueChange={(value) => setRegistrationData(prev => ({ ...prev, countryCode: value }))}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {countryCodes.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.code} {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      id="phone"
                      value={registrationData.phone || ''}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="50 123 4567"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={registrationData.dateOfBirth || ''}
                    onChange={(e) => setRegistrationData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  value={registrationData.address || ''}
                  onChange={(e) => setRegistrationData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter your complete address"
                  rows={3}
                  required
                />
              </div>
            </div>

            {/* Course Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Course Selection
              </h3>

              <div className="space-y-3">
                {courses.map((course) => (
                  <div key={course.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                    <input
                      type="checkbox"
                      id={`course-${course.id}`}
                      checked={registrationData.selectedCourses?.includes(course.id) || false}
                      onChange={(e) => handleCourseSelection(course.id, e.target.checked)}
                      className="w-4 h-4 text-primary"
                    />
                    <label htmlFor={`course-${course.id}`} className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{course.code}</span>
                        <div>
                          <span className="font-medium">{course.language}</span>
                          <p className="text-sm text-muted-foreground">{course.duration}</p>
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Identification Documents */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Identification Documents
              </h3>

              <div>
                <Label htmlFor="idType">ID Type *</Label>
                <Select
                  value={registrationData.idType || ''}
                  onValueChange={(value: "id_card" | "passport") => setRegistrationData(prev => ({ ...prev, idType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id_card">ID Card</SelectItem>
                    <SelectItem value="passport">Passport</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="idNumber">ID Number *</Label>
                <Input
                  id="idNumber"
                  value={registrationData.idNumber || ''}
                  onChange={(e) => setRegistrationData(prev => ({ ...prev, idNumber: e.target.value }))}
                  placeholder="Enter your ID number"
                  required
                />
              </div>

              <div>
                <Label htmlFor="idDocument">Upload ID Document *</Label>
                <div className="mt-2">
                  <input
                    id="idDocument"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    required
                  />
                  <label
                    htmlFor="idDocument"
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
                  >
                    {idDocumentPreview ? (
                      <div className="text-center">
                        <img src={idDocumentPreview} alt="ID Preview" className="max-h-20 mx-auto mb-2 rounded" />
                        <p className="text-sm text-muted-foreground">Document uploaded</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Click to upload ID document</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, PDF up to 5MB</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t">
              {submitMessage && (
                <div className={`p-4 rounded-lg mb-4 ${
                  submitMessage.includes('successfully')
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {submitMessage}
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-primary to-gold hover:from-primary/90 hover:to-gold/90"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowRegistrationForm(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                By submitting this form, you agree to our terms and conditions.
                Your application will be reviewed and you'll receive a confirmation email.
              </p>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
