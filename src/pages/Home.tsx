import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ArrowRight, Globe, Users, Award, BookOpen, CheckCircle2, Star, Sparkles, Trophy, Target, ChevronLeft, ChevronRight, Quote, Play, Calendar, MapPin, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  const languages = [
    { name: "French", code: "FR", levels: "A1 - C2", color: "bg-blue-600" },
    { name: "German", code: "DE", levels: "A1 - C2", color: "bg-gray-800" },
    { name: "Spanish", code: "ES", levels: "A1 - C2", color: "bg-red-600" },
    { name: "Italian", code: "IT", levels: "A1 - C2", color: "bg-green-600" },
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
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gold text-gold hover:bg-gold hover:text-gold-foreground backdrop-blur-sm text-base sm:text-lg px-8 h-12 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  data-testid="button-hero-contact"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Contact Us
                </Button>
              </Link>
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

      {/* Our Learning Environment - Enhanced Gallery Experience */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-primary/5 via-background to-gold/5 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-gold/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-primary/5 to-gold/5 rounded-full blur-2xl"></div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-6 h-6 border-2 border-primary/20 rotate-45 animate-float"></div>
        <div className="absolute top-40 right-20 w-8 h-8 bg-gold/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-primary/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-5 h-5 border border-gold/30 rounded-lg rotate-12 animate-float" style={{ animationDelay: '0.5s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-gold/20 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-3 mb-6 shadow-lg">
              <Play className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-sm font-semibold text-primary">Experience Excellence</span>
            </div>

            <h2 className="font-bold text-4xl sm:text-6xl mb-6 text-foreground leading-tight">
              Our Learning
              <span className="block bg-gradient-to-r from-primary via-gold to-primary bg-clip-text text-transparent animate-shimmer">
                Environment
              </span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover the premium facilities and vibrant atmosphere that make learning European languages an exceptional experience.
              Step into a world of innovation and excellence.
            </p>
          </div>

          {/* Enhanced Gallery Display */}
          <div className="relative max-w-6xl mx-auto">
            {/* Main Featured Display */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-white via-primary/5 to-gold/5 p-12 mb-8">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>

              <div className="relative z-10 text-center">
                {/* Large emoji display with enhanced animation */}
                <div className="relative inline-block mb-8">
                  <div className="text-9xl animate-float drop-shadow-2xl transform hover:scale-110 transition-transform duration-500">
                    {galleryImages[currentImage].src}
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 text-9xl animate-float opacity-20 blur-sm" style={{ animationDelay: '0.5s' }}>
                    {galleryImages[currentImage].src}
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-foreground mb-4 leading-tight">
                  {galleryImages[currentImage].caption}
                </h3>

                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  State-of-the-art facilities designed for optimal learning, featuring modern technology,
                  comfortable environments, and innovative teaching spaces.
                </p>

                {/* Feature highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <div className="flex flex-col items-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <span className="font-semibold text-foreground">Interactive Learning</span>
                    <span className="text-sm text-muted-foreground">Modern classrooms</span>
                  </div>

                  <div className="flex flex-col items-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-3">
                      <BookOpen className="w-6 h-6 text-gold" />
                    </div>
                    <span className="font-semibold text-foreground">Resource Center</span>
                    <span className="text-sm text-muted-foreground">Extensive materials</span>
                  </div>

                  <div className="flex flex-col items-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <span className="font-semibold text-foreground">Certification Area</span>
                    <span className="text-sm text-muted-foreground">Official ceremonies</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Navigation arrows */}
              <button
                onClick={() => setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/95 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 group border border-white/20"
              >
                <ChevronLeft className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={() => setCurrentImage((prev) => (prev + 1) % galleryImages.length)}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/95 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 group border border-white/20"
              >
                <ChevronRight className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
              </button>

              {/* Auto-play indicator */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-xs text-white/80 font-medium">Auto-playing</span>
              </div>
            </div>

            {/* Enhanced Thumbnail Gallery */}
            <div className="flex justify-center gap-4 mb-8">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`relative overflow-hidden rounded-2xl transition-all duration-500 transform ${
                    index === currentImage
                      ? 'scale-110 shadow-2xl ring-4 ring-primary/50'
                      : 'scale-100 shadow-lg hover:scale-105 hover:shadow-xl'
                  }`}
                >
                  <div className={`w-20 h-20 flex items-center justify-center text-3xl transition-all duration-300 ${
                    index === currentImage
                      ? 'bg-gradient-to-br from-primary/20 to-gold/20'
                      : 'bg-white/80 hover:bg-white'
                  } backdrop-blur-sm border border-white/30`}>
                    {image.src}
                  </div>

                  {/* Active indicator */}
                  {index === currentImage && (
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Progress bar */}
            <div className="max-w-md mx-auto">
              <div className="w-full bg-muted/50 rounded-full h-2 mb-4 overflow-hidden">
                <div
                  className="h-2 bg-gradient-to-r from-primary to-gold rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${((currentImage + 1) / galleryImages.length) * 100}%` }}
                ></div>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                {currentImage + 1} of {galleryImages.length} facilities
              </div>
            </div>
          </div>

          {/* Environment Benefits */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center group">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h4 className="font-bold text-lg mb-2 text-foreground">Expert Faculty</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Learn from certified native speakers and experienced educators</p>
            </div>

            <div className="text-center group">
              <div className="w-14 h-14 bg-gradient-to-br from-gold/20 to-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-7 h-7 text-gold" />
              </div>
              <h4 className="font-bold text-lg mb-2 text-foreground">Modern Resources</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Access to cutting-edge learning materials and technology</p>
            </div>

            <div className="text-center group">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h4 className="font-bold text-lg mb-2 text-foreground">Personalized Learning</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Individual attention with small class sizes and flexible scheduling</p>
            </div>

            <div className="text-center group">
              <div className="w-14 h-14 bg-gradient-to-br from-gold/20 to-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-7 h-7 text-gold" />
              </div>
              <h4 className="font-bold text-lg mb-2 text-foreground">Certified Excellence</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Internationally recognized certificates and quality assurance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Languages - Master European Languages */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-gold/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-primary/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-r from-primary/5 to-gold/5 rounded-full blur-2xl"></div>

        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-10 w-8 h-8 border-2 border-primary/20 rotate-45 animate-float"></div>
        <div className="absolute top-40 left-20 w-6 h-6 bg-gold/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 right-20 w-10 h-10 border border-gold/30 rounded-lg rotate-12 animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-gold/20 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-3 mb-6 shadow-lg">
              <Globe className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-sm font-semibold text-primary">European Excellence</span>
            </div>

            <h2 className="font-bold text-4xl sm:text-6xl mb-6 text-foreground leading-tight">
              Master
              <span className="block bg-gradient-to-r from-primary via-gold to-primary bg-clip-text text-transparent animate-shimmer">
                European Languages
              </span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Choose from our premium selection of European languages and embark on your linguistic journey with expert native instructors.
              Transform your communication skills and open doors to incredible opportunities.
            </p>
          </div>

          {/* Interactive Language Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {languages.map((lang, index) => (
              <Card key={index} className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-primary/5 shadow-xl hover:shadow-2xl hover:shadow-primary/15 transition-all duration-500 transform hover:-translate-y-3 cursor-pointer" data-testid={`card-language-${lang.name.toLowerCase()}`}>
                {/* Animated background gradients */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Animated border */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-gold to-primary opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-lg blur-sm"></div>

                <CardContent className="p-8 text-center relative z-10">
                  {/* Flag/Language Icon with enhanced styling */}
                  <div className="relative mb-6">
                    <div className={`w-24 h-24 mx-auto rounded-2xl ${lang.color} flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 transform group-hover:shadow-3xl`}>
                      <span className="text-white font-bold text-3xl drop-shadow-lg">{lang.code}</span>
                    </div>

                    {/* Floating accent elements */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold/30 rounded-full blur-sm group-hover:bg-gold/50 transition-colors duration-300 animate-pulse"></div>
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-primary/20 rounded-full group-hover:bg-primary/40 transition-colors duration-300"></div>
                  </div>

                  {/* Language Name */}
                  <h3 className="font-bold text-2xl mb-3 text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                    {lang.name}
                  </h3>

                  {/* Level Info */}
                  <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">{lang.levels}</span>
                  </div>

                  {/* Progress indicator */}
                  <div className="w-full bg-muted/50 rounded-full h-2 mb-4 overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-primary to-gold rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                  </div>

                  {/* Call to action hint */}
                  <p className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    Click to explore courses →
                  </p>

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  {/* Corner decorations */}
                  <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-primary/30 group-hover:border-gold/50 transition-colors duration-300"></div>
                  <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-primary/30 group-hover:border-gold/50 transition-colors duration-300"></div>
                </CardContent>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-gold/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>
              </Card>
            ))}
          </div>

          {/* Language Benefits */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-bold text-lg mb-2 text-foreground">Native Instructors</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">Learn from certified native speakers with years of teaching experience</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-8 h-8 text-gold" />
              </div>
              <h4 className="font-bold text-lg mb-2 text-foreground">CEFR Certified</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">Internationally recognized certificates from A1 to C2 proficiency levels</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-bold text-lg mb-2 text-foreground">Flexible Learning</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">Personalized schedules and small class sizes for optimal learning</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Excellence in Language Education */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-primary/5 via-background to-gold/5 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-gold/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-primary/5 to-gold/5 rounded-full blur-2xl"></div>

        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-gold/30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-gold/40 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-primary/25 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gold/20 to-primary/20 backdrop-blur-sm border border-gold/30 rounded-full px-6 py-3 mb-6 shadow-lg">
              <Trophy className="w-5 h-5 text-gold animate-pulse" />
              <span className="text-sm font-semibold text-gold-foreground">Why We're Different</span>
            </div>

            <h2 className="font-bold text-4xl sm:text-6xl mb-6 text-foreground leading-tight">
              Excellence in
              <span className="block bg-gradient-to-r from-primary via-gold to-primary bg-clip-text text-transparent animate-shimmer">
                Language Education
              </span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover what makes our institute the premier choice for European language learning in the UAE.
              Experience world-class education that transforms lives and opens global opportunities.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-primary/5 shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 transform hover:-translate-y-2" data-testid={`card-feature-${index}`}>
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Animated border */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-gold to-primary opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-lg"></div>

                <CardContent className="p-8 relative z-10">
                  {/* Icon with enhanced styling */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-gold/10 rounded-2xl flex items-center justify-center group-hover:from-primary/20 group-hover:to-gold/20 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3 shadow-lg">
                      <feature.icon className="w-8 h-8 text-primary group-hover:text-gold transition-colors duration-300" />
                    </div>
                    {/* Floating accent */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold/20 rounded-full blur-sm group-hover:bg-gold/40 transition-colors duration-300"></div>
                  </div>

                  <h3 className="font-bold text-xl mb-4 text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                    {feature.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </CardContent>

                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/20 group-hover:border-gold/40 transition-colors duration-300"></div>
              </Card>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-4xl font-bold text-primary mb-2 group-hover:text-gold transition-colors duration-300">5000+</div>
              <div className="text-sm text-muted-foreground font-medium">Students Trained</div>
              <div className="w-12 h-1 bg-primary mx-auto mt-2 group-hover:bg-gold transition-colors duration-300"></div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold text-primary mb-2 group-hover:text-gold transition-colors duration-300">15+</div>
              <div className="text-sm text-muted-foreground font-medium">Years Experience</div>
              <div className="w-12 h-1 bg-primary mx-auto mt-2 group-hover:bg-gold transition-colors duration-300"></div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold text-primary mb-2 group-hover:text-gold transition-colors duration-300">98%</div>
              <div className="text-sm text-muted-foreground font-medium">Success Rate</div>
              <div className="w-12 h-1 bg-primary mx-auto mt-2 group-hover:bg-gold transition-colors duration-300"></div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold text-primary mb-2 group-hover:text-gold transition-colors duration-300">5</div>
              <div className="text-sm text-muted-foreground font-medium">Languages Offered</div>
              <div className="w-12 h-1 bg-primary mx-auto mt-2 group-hover:bg-gold transition-colors duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CEFR Levels - Internationally Recognized Proficiency Levels */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-background via-gold/5 to-primary/5 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-gold/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-primary/5 to-gold/5 rounded-full blur-2xl"></div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-6 h-6 border-2 border-primary/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-8 h-8 bg-gold/20 rounded-lg rotate-45 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-primary/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-gold/20 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-3 mb-6 shadow-lg">
              <Target className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-sm font-semibold text-primary">CEFR Framework</span>
            </div>

            <h2 className="font-bold text-4xl sm:text-6xl mb-6 text-foreground leading-tight">
              Internationally Recognized
              <span className="block bg-gradient-to-r from-primary via-gold to-primary bg-clip-text text-transparent animate-shimmer">
                Proficiency Levels
              </span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our comprehensive curriculum follows the Common European Framework of Reference for Languages (CEFR),
              ensuring global recognition of your achievements and opening doors to international opportunities.
            </p>
          </div>

          {/* Enhanced CEFR Level Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {levels.map((level, index) => (
              <Card key={index} className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-primary/5 shadow-xl hover:shadow-2xl hover:shadow-primary/15 transition-all duration-500 transform hover:-translate-y-2" data-testid={`card-level-${level.level}`}>
                {/* Animated background gradients */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Animated border */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-gold to-primary opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-lg"></div>

                <CardContent className="p-8 relative z-10">
                  {/* Level header with enhanced styling */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-gold/20 rounded-2xl flex items-center justify-center group-hover:from-primary/30 group-hover:to-gold/30 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                        <CheckCircle2 className="w-7 h-7 text-primary group-hover:text-gold transition-colors duration-300" />
                      </div>
                      {/* Floating accent */}
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-gold/30 rounded-full blur-sm group-hover:bg-gold/50 transition-colors duration-300 animate-pulse"></div>
                    </div>

                    <div>
                      <h3 className="font-bold text-3xl text-foreground group-hover:text-primary transition-colors duration-300 mb-1">
                        {level.level}
                      </h3>
                      <div className="w-12 h-1 bg-primary group-hover:bg-gold transition-colors duration-300"></div>
                    </div>
                  </div>

                  {/* Level name and description */}
                  <h4 className="font-bold text-xl mb-4 text-foreground group-hover:text-primary/80 transition-colors duration-300">
                    {level.name}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300 mb-6">
                    {level.description}
                  </p>

                  {/* Enhanced progress indicator */}
                  <div className="relative">
                    <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden shadow-inner">
                      <div
                        className="h-3 bg-gradient-to-r from-primary via-gold to-primary rounded-full transition-all duration-700 group-hover:scale-y-125 group-hover:shadow-lg relative"
                        style={{ width: `${((index + 1) / levels.length) * 100}%` }}
                      >
                        {/* Animated shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      </div>
                    </div>

                    {/* Progress percentage */}
                    <div className="text-right mt-2">
                      <span className="text-sm font-medium text-primary group-hover:text-gold transition-colors duration-300">
                        {Math.round(((index + 1) / levels.length) * 100)}% Complete
                      </span>
                    </div>
                  </div>

                  {/* Level features */}
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full group-hover:bg-gold transition-colors duration-300"></div>
                      <span>Comprehensive curriculum</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full group-hover:bg-gold transition-colors duration-300"></div>
                      <span>Practical exercises</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full group-hover:bg-gold transition-colors duration-300"></div>
                      <span>Assessment ready</span>
                    </div>
                  </div>
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

      {/* Why Choose European Languages - Enhanced Benefits Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-background via-primary/5 to-gold/5 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-gold/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-primary/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-gradient-to-r from-primary/5 to-gold/5 rounded-full blur-2xl"></div>

        {/* Floating decorative elements */}
        <div className="absolute top-24 right-12 w-8 h-8 border-2 border-primary/20 rotate-45 animate-float"></div>
        <div className="absolute top-48 left-16 w-6 h-6 bg-gold/20 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-36 right-24 w-10 h-10 border border-gold/30 rounded-lg rotate-12 animate-float" style={{ animationDelay: '0.8s' }}></div>
        <div className="absolute bottom-24 left-1/3 w-4 h-4 bg-primary/25 rounded-full animate-float" style={{ animationDelay: '2.2s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-gold/20 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-3 mb-6 shadow-lg">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-sm font-semibold text-primary">Why Choose Us</span>
            </div>

            <h2 className="font-bold text-4xl sm:text-6xl mb-6 text-foreground leading-tight">
              Why Choose
              <span className="block bg-gradient-to-r from-primary via-gold to-primary bg-clip-text text-transparent animate-shimmer">
                European Languages?
              </span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover the transformative advantages of learning Europe's most influential languages.
              Join thousands who have unlocked global opportunities through our comprehensive programs.
            </p>
          </div>

          {/* Enhanced Benefits Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-primary/5 shadow-xl hover:shadow-2xl hover:shadow-primary/15 transition-all duration-500 transform hover:-translate-y-3">
              {/* Animated background gradients */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Animated border */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-gold to-primary opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-lg"></div>

              <CardContent className="p-8 text-center relative z-10">
                {/* Icon with enhanced styling */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-gold/20 rounded-3xl flex items-center justify-center mx-auto group-hover:from-primary/30 group-hover:to-gold/30 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6 shadow-xl">
                    <Globe className="w-10 h-10 text-primary group-hover:text-gold transition-colors duration-300" />
                  </div>

                  {/* Floating accent elements */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold/30 rounded-full blur-sm group-hover:bg-gold/50 transition-colors duration-300 animate-pulse"></div>
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-primary/20 rounded-full group-hover:bg-primary/40 transition-colors duration-300"></div>
                </div>

                <h3 className="font-bold text-2xl mb-4 text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                  Global Opportunities
                </h3>

                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300 mb-6">
                  Open doors to business, travel, and cultural exchange across Europe and beyond. French, German, Spanish, and Italian are official languages in multiple international organizations.
                </p>

                {/* Feature highlights */}
                <div className="space-y-2 text-left">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary group-hover:text-gold transition-colors duration-300 flex-shrink-0" />
                    <span className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">International business opportunities</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary group-hover:text-gold transition-colors duration-300 flex-shrink-0" />
                    <span className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">Cultural exchange programs</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary group-hover:text-gold transition-colors duration-300 flex-shrink-0" />
                    <span className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">Travel and tourism advantages</span>
                  </div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                {/* Corner decorations */}
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-primary/20 group-hover:border-gold/40 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-primary/20 group-hover:border-gold/40 transition-colors duration-300"></div>
              </CardContent>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-gold/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>
            </Card>

            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-gold/5 shadow-xl hover:shadow-2xl hover:shadow-gold/15 transition-all duration-500 transform hover:-translate-y-3">
              {/* Animated background gradients */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Animated border */}
              <div className="absolute inset-0 bg-gradient-to-r from-gold via-primary to-gold opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-lg"></div>

              <CardContent className="p-8 text-center relative z-10">
                {/* Icon with enhanced styling */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-gold/20 to-primary/20 rounded-3xl flex items-center justify-center mx-auto group-hover:from-gold/30 group-hover:to-primary/30 transition-all duration-300 transform group-hover:scale-110 group-hover:-rotate-6 shadow-xl">
                    <Calendar className="w-10 h-10 text-gold group-hover:text-primary transition-colors duration-300" />
                  </div>

                  {/* Floating accent elements */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary/30 rounded-full blur-sm group-hover:bg-primary/50 transition-colors duration-300 animate-pulse"></div>
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gold/20 rounded-full group-hover:bg-gold/40 transition-colors duration-300"></div>
                </div>

                <h3 className="font-bold text-2xl mb-4 text-foreground group-hover:text-gold transition-colors duration-300 leading-tight">
                  Cultural Heritage
                </h3>

                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300 mb-6">
                  Immerse yourself in rich European cultures, literature, art, and traditions. Understanding these languages connects you to centuries of human achievement and innovation.
                </p>

                {/* Feature highlights */}
                <div className="space-y-2 text-left">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-gold group-hover:text-primary transition-colors duration-300 flex-shrink-0" />
                    <span className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">Rich literary traditions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-gold group-hover:text-primary transition-colors duration-300 flex-shrink-0" />
                    <span className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">Artistic and cultural heritage</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-gold group-hover:text-primary transition-colors duration-300 flex-shrink-0" />
                    <span className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">Historical significance</span>
                  </div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                {/* Corner decorations */}
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-gold/20 group-hover:border-primary/40 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-gold/20 group-hover:border-primary/40 transition-colors duration-300"></div>
              </CardContent>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-primary/10 to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>
            </Card>

            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-primary/5 shadow-xl hover:shadow-2xl hover:shadow-primary/15 transition-all duration-500 transform hover:-translate-y-3">
              {/* Animated background gradients */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Animated border */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-gold to-primary opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-lg"></div>

              <CardContent className="p-8 text-center relative z-10">
                {/* Icon with enhanced styling */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-gold/20 rounded-3xl flex items-center justify-center mx-auto group-hover:from-primary/30 group-hover:to-gold/30 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6 shadow-xl">
                    <MapPin className="w-10 h-10 text-primary group-hover:text-gold transition-colors duration-300" />
                  </div>

                  {/* Floating accent elements */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold/30 rounded-full blur-sm group-hover:bg-gold/50 transition-colors duration-300 animate-pulse"></div>
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-primary/20 rounded-full group-hover:bg-primary/40 transition-colors duration-300"></div>
                </div>

                <h3 className="font-bold text-2xl mb-4 text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                  Career Advancement
                </h3>

                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300 mb-6">
                  Boost your professional prospects in international business, tourism, diplomacy, and education. European language skills are highly valued by multinational corporations.
                </p>

                {/* Feature highlights */}
                <div className="space-y-2 text-left">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary group-hover:text-gold transition-colors duration-300 flex-shrink-0" />
                    <span className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">International business careers</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary group-hover:text-gold transition-colors duration-300 flex-shrink-0" />
                    <span className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">Diplomatic and government roles</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary group-hover:text-gold transition-colors duration-300 flex-shrink-0" />
                    <span className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">Tourism and hospitality industry</span>
                  </div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                {/* Corner decorations */}
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-primary/20 group-hover:border-gold/40 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-primary/20 group-hover:border-gold/40 transition-colors duration-300"></div>
              </CardContent>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-gold/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-gold/10 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3 mb-6">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Ready to Start Your Journey?</span>
            </div>

            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of successful professionals who have transformed their careers through European language mastery
            </p>

            <Link href="/courses">
              <Button className="bg-gradient-to-r from-primary to-gold hover:from-primary/90 hover:to-gold/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-4 transform hover:scale-105">
                <BookOpen className="mr-2 w-5 h-5" />
                Explore Our Courses
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
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
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gold text-gold hover:bg-gold hover:text-gold-foreground backdrop-blur-sm text-base sm:text-lg px-8 h-12 shadow-lg hover:shadow-xl transition-all duration-300 group transform hover:scale-[1.02]"
                data-testid="button-cta-contact"
              >
                <MessageCircle className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Contact Us Now
              </Button>
            </Link>
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
