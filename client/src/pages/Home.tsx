import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Globe, Users, Award, BookOpen, CheckCircle2, Star, Sparkles, Trophy, Target, ChevronLeft, ChevronRight, Quote, Play, Calendar, MapPin, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { INSTITUTE_INFO } from "@/shared/schema";

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  const languages = [
    { name: "French", code: "FR", color: "bg-blue-600" },
    { name: "Dautch", code: "DE", color: "bg-gray-800" },
    { name: "Spanish", code: "ES", color: "bg-red-600" },
    { name: "Italian", code: "IT", color: "bg-green-600" },
    { name: "English", code: "EN", color: "bg-primary" },
  ];

  const testimonials = [
    {
      name: "Sarah Ahmed",
      role: "Business Executive",
      language: "French",
      image: "👩‍💼",
      text: "The French course completely transformed my career. I can now communicate fluently with our European partners.",
      rating: 5
    },
    {
      name: "Mohammed Al-Rashid",
      role: "Student",
      language: "German",
      image: "👨‍🎓",
      text: "Excellent teaching methodology. The instructors are native speakers who make learning enjoyable and effective.",
      rating: 5
    },
    {
      name: "Fatima Hassan",
      role: "Tour Guide",
      language: "Spanish",
      image: "👩‍🚀",
      text: "Learning Spanish opened up amazing opportunities in tourism. The cultural immersion aspect was incredible.",
      rating: 5
    }
  ];

  const galleryImages = [
    { src: "🏛️", alt: "Classroom", caption: "Modern Language Classroom" },
    { src: "👥", alt: "Group Study", caption: "Interactive Group Sessions" },
    { src: "📚", alt: "Library", caption: "Resource Center" },
    { src: "🎯", alt: "Certification", caption: "Certificate Ceremony" },
    { src: "🌍", alt: "Cultural Event", caption: "European Cultural Events" }
  ];

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % galleryImages.length);
    }, 4000);

    return () => {
      clearInterval(testimonialInterval);
      clearInterval(imageInterval);
    };
  }, []);

  const features = [
    {
      icon: Star,
      title: "Expert Native Instructors",
      description: "Learn from certified native speakers with 15+ years of teaching experience",
    },
    {
      icon: Trophy,
      title: "CEFR Certified Programs",
      description: "Internationally recognized certificates from A1 to C2 proficiency levels",
    },
    {
      icon: Target,
      title: "Personalized Learning",
      description: "Small class sizes with individual attention and progress tracking",
    },
    {
      icon: Sparkles,
      title: "Cultural Immersion",
      description: "Experience European culture through authentic materials and activities",
    },
  ];

  const levels = [
    { level: "A1-A2", name: "Basic User", description: "Elementary proficiency" },
    { level: "B1-B2", name: "Independent User", description: "Intermediate proficiency" },
    { level: "C1-C2", name: "Proficient User", description: "Advanced proficiency" },
  ];

  const handleWhatsAppClick = (message: string) => {
    const phone = INSTITUTE_INFO.contact.whatsapp.replace(/[^0-9]/g, "");
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent animate-pulse"></div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gold/20 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-primary-foreground/10 rounded-full blur-lg animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-gold/15 rounded-full blur-md animate-bounce"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            {/* Premium badge */}
            <div className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium text-gold-foreground">Premium Language Institute</span>
            </div>

            <h1 className="font-bold text-4xl sm:text-5xl md:text-7xl mb-6 leading-tight">
              Master European Languages
              <span className="block text-gold mt-2">in Sharjah, UAE</span>
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform your future with our elite language training institute. Experience world-class education in French, German, Spanish, Italian, and English with certified native instructors.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-8 text-primary-foreground/80">
              <div className="text-center">
                <div className="text-2xl font-bold text-gold">5000+</div>
                <div className="text-sm">Students Taught</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gold">15+</div>
                <div className="text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gold">5</div>
                <div className="text-sm">Languages Offered</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/courses">
                <Button
                  size="lg"
                  className="bg-gold text-gold-foreground hover:bg-gold/90 shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg px-8 h-12 transform hover:scale-105"
                  data-testid="button-hero-browse-courses"
                >
                  <Sparkles className="mr-2 w-5 h-5" />
                  Start Learning Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gold text-gold hover:bg-gold hover:text-gold-foreground backdrop-blur-sm text-base sm:text-lg px-8 h-12 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => handleWhatsAppClick("Hello! I'm interested in learning European languages at your institute.")}
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Contact Us
              </Button>
              <Link href="/verify">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm text-base sm:text-lg px-8 h-12 shadow-lg hover:shadow-xl transition-all duration-300"
                  data-testid="button-hero-verify"
                >
                  <Award className="mr-2 w-5 h-5" />
                  Verify Certificate
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Languages */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-bold text-3xl sm:text-5xl mb-4 text-foreground">
              European Languages We Teach
            </h2>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Choose from our premium selection of European languages and embark on your linguistic journey with expert native instructors.
              Transform your communication skills and open doors to incredible opportunities.
            </p>
          </div>

          {/* Interactive Language Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
            {languages.map((lang, index) => (
              <Card key={index} className="hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer border-card-border group" data-testid={`card-language-${lang.name.toLowerCase()}`}>
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-full ${lang.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-white font-bold text-xl sm:text-2xl">{lang.code}</span>
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl mb-2 text-foreground group-hover:text-primary transition-colors duration-300">{lang.name}</h3>

                  {/* Language style highlights */}
                  <div className="flex flex-wrap gap-1 justify-center mb-2">
                    {lang.name === 'French' && (
                      <>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">🇫🇷 Elegant</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">Romantic</span>
                      </>
                    )}
                    {lang.name === 'Dautch' && (
                      <>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full font-medium">🇩🇪 Precise</span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full font-medium">Technical</span>
                      </>
                    )}
                    {lang.name === 'Spanish' && (
                      <>
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">🇪🇸 Passionate</span>
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">Expressive</span>
                      </>
                    )}
                    {lang.name === 'Italian' && (
                      <>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">🇮🇹 Musical</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">Artistic</span>
                      </>
                    )}
                    {lang.name === 'English' && (
                      <>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">🌍 Global</span>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">Business</span>
                      </>
                    )}
                  </div>

                  <div className="w-full h-1 bg-gradient-to-r from-primary/20 to-gold/20 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-bold text-3xl sm:text-5xl mb-4 text-foreground">
              Why Choose Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience excellence in language education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-card-border group relative overflow-hidden" data-testid={`card-feature-${index}`}>
                <CardContent className="p-6">
                  <feature.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="font-bold text-xl mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>

                {/* Corner decorations */}
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-primary/20 group-hover:border-gold/40 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-primary/20 group-hover:border-gold/40 transition-colors duration-300"></div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-gold/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>
              </Card>
            ))}
          </div>

          {/* CEFR Benefits */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-3 mb-6">
              <Award className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">CEFR Benefits</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="group text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors duration-300">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Global Recognition</h4>
                <p className="text-sm text-muted-foreground">Accepted worldwide by universities and employers</p>
              </div>

              <div className="group text-center">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-gold/20 transition-colors duration-300">
                  <BookOpen className="w-6 h-6 text-gold" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Structured Learning</h4>
                <p className="text-sm text-muted-foreground">Clear progression from beginner to advanced levels</p>
              </div>

              <div className="group text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors duration-300">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Measurable Progress</h4>
                <p className="text-sm text-muted-foreground">Track your improvement with standardized assessments</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-muted/20 via-background to-primary/5 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gold/10 rounded-full px-4 py-2 mb-4">
              <Quote className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium text-gold-foreground">Student Success Stories</span>
            </div>
            <h2 className="font-bold text-3xl sm:text-5xl mb-4 text-foreground">
              What Our Students Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real experiences from students who have transformed their lives through our European language programs
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Main testimonial */}
            <Card className="border-card-border shadow-xl bg-gradient-to-br from-white to-primary/5">
              <CardContent className="p-8 md:p-12">
                <div className="text-center">
                  {/* Quote icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                    <Quote className="w-8 h-8 text-primary" />
                  </div>

                  {/* Testimonial text */}
                  <blockquote className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed italic">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>

                  {/* Rating stars */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                    ))}
                  </div>

                  {/* Student info */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="text-4xl mb-2">{testimonials[currentTestimonial].image}</div>
                    <div>
                      <h4 className="font-bold text-lg text-foreground">{testimonials[currentTestimonial].name}</h4>
                      <p className="text-primary font-medium">{testimonials[currentTestimonial].role}</p>
                      <p className="text-sm text-muted-foreground">{testimonials[currentTestimonial].language} Student</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors group border border-primary/20"
              >
                <ChevronLeft className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              </button>

              {/* Dots indicator */}
              <div className="flex gap-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? 'bg-primary scale-125 shadow-lg'
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors group border border-primary/20"
              >
                <ChevronRight className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-gold/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Our Achievements</span>
            </div>
            <h2 className="font-bold text-3xl sm:text-5xl mb-4 text-foreground">
              Numbers That Speak
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of successful language learners who have transformed their careers and lives
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">5000+</div>
              <div className="text-muted-foreground">Students Taught</div>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-gold/20 to-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-10 h-10 text-gold" />
              </div>
              <div className="text-3xl font-bold text-gold mb-2">15+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-10 h-10 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">5</div>
              <div className="text-muted-foreground">Languages Offered</div>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-gold/20 to-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle2 className="w-10 h-10 text-gold" />
              </div>
              <div className="text-3xl font-bold text-gold mb-2">98%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gold/10 rounded-full px-4 py-2 mb-4">
              <Play className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium text-gold-foreground">Our Campus</span>
            </div>
            <h2 className="font-bold text-3xl sm:text-5xl mb-4 text-foreground">
              Experience Our Learning Environment
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Modern classrooms, interactive learning spaces, and a vibrant community of language enthusiasts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {galleryImages.map((image, index) => (
              <Card key={index} className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                  {image.src}
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {image.caption}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gold/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-gold animate-pulse" />
            <span className="text-sm font-medium text-gold-foreground">Limited Time Offer</span>
          </div>

          <h2 className="font-bold text-3xl sm:text-5xl mb-6">
            Transform Your Future Today
          </h2>
          <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join over 5,000 successful students who have mastered European languages and opened doors to incredible opportunities
          </p>

          {/* Enhanced CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <Link href="/courses">
              <Button
                size="lg"
                className="bg-gold text-gold-foreground hover:bg-gold/90 shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg px-8 h-12 transform hover:scale-105 group"
                data-testid="button-cta-view-courses"
              >
                <BookOpen className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-gold text-gold hover:bg-gold hover:text-gold-foreground backdrop-blur-sm text-base sm:text-lg px-8 h-12 shadow-lg hover:shadow-xl transition-all duration-300 group transform hover:scale-[1.02]"
              onClick={() => handleWhatsAppClick("Hello! I'm interested in learning European languages at your institute.")}
            >
              <MessageCircle className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              Contact Us Now
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-primary-foreground/70 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold" />
              <span>Native Instructors</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold" />
              <span>CEFR Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold" />
              <span>Flexible Schedule</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

