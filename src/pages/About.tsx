import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, BookOpen, Users, Award, Globe, CheckCircle2, Star, Trophy, GraduationCap } from "lucide-react";
import { INSTITUTE_INFO } from "@shared/schema";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To provide high-quality language education that empowers students to communicate confidently in European languages and achieve their personal and professional goals.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description: "To be the leading language institute in the UAE, recognized for excellence in European language education and cultural understanding.",
    },
    {
      icon: BookOpen,
      title: "Teaching Methodology",
      description: "We use the Communicative Approach, focusing on practical language use through interactive activities, real-world scenarios, and cultural immersion.",
    },
  ];

  const stats = [
    { icon: Users, number: "5000+", label: "Students Taught" },
    { icon: Award, number: "15+", label: "Years Experience" },
    { icon: Globe, number: "5", label: "Languages Offered" },
    { icon: BookOpen, number: "6", label: "CEFR Levels" },
  ];

  const completedCourses = [
    {
      language: "French",
      levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
      students: 1200,
      icon: "🇫🇷"
    },
    {
      language: "German",
      levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
      students: 950,
      icon: "🇩🇪"
    },
    {
      language: "Spanish",
      levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
      students: 1100,
      icon: "🇪🇸"
    },
    {
      language: "Italian",
      levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
      students: 800,
      icon: "🇮🇹"
    },
    {
      language: "English",
      levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
      students: 1400,
      icon: "🇬🇧"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl mb-6">
            About Our Institute
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Your trusted partner in European language education since 2009
          </p>
        </div>
      </section>

      {/* Mission, Vision, Methodology */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-card-border" data-testid={`card-value-${index}`}>
                <CardContent className="p-8">
                  <value.icon className="w-12 h-12 text-primary mb-4" />
                  <h2 className="font-bold text-2xl mb-4 text-foreground">{value.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center" data-testid={`stat-${index}`}>
                <stat.icon className="w-12 h-12 text-primary mx-auto mb-3" />
                <div className="font-bold text-4xl text-foreground mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Completed Courses Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gold/10 rounded-full px-4 py-2 mb-4">
              <Trophy className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium text-gold-foreground">Success Stories</span>
            </div>
            <h2 className="font-bold text-3xl sm:text-5xl mb-4 text-foreground">
              Courses Successfully Completed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of successful students who have mastered European languages with our comprehensive programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedCourses.map((course, index) => (
              <Card key={index} className="border-card-border hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group overflow-hidden" data-testid={`card-completed-${course.language.toLowerCase()}`}>
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">{course.icon}</div>
                    <div>
                      <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">{course.language}</h3>
                      <p className="text-sm text-muted-foreground">{course.students} students completed</p>
                    </div>
                  </div>

                  {/* Levels */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {course.levels.map((level, levelIndex) => (
                        <div key={levelIndex} className="flex items-center gap-1 bg-primary/10 rounded-full px-3 py-1">
                          <CheckCircle2 className="w-3 h-3 text-primary" />
                          <span className="text-xs font-medium text-primary">{level}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Completion Rate</span>
                      <span className="font-medium text-foreground">98%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-gold h-2 rounded-full transition-all duration-1000 group-hover:scale-y-110"
                        style={{ width: '98%' }}
                      ></div>
                    </div>
                  </div>

                  {/* Success Badge */}
                  <div className="mt-4 flex items-center gap-2">
                    <Star className="w-4 h-4 text-gold fill-current" />
                    <span className="text-sm font-medium text-gold-foreground">High Success Rate</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="mt-12 text-center">
            <Card className="border-card-border bg-gradient-to-r from-primary/5 to-gold/5 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-2xl mb-2 text-foreground">Total Success</h3>
                <p className="text-muted-foreground mb-4">
                  Over 5,450 courses completed across all languages with a 98% success rate
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="font-bold text-2xl text-primary">5,450</div>
                    <div className="text-sm text-muted-foreground">Courses</div>
                  </div>
                  <div>
                    <div className="font-bold text-2xl text-primary">98%</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                  <div>
                    <div className="font-bold text-2xl text-primary">30</div>
                    <div className="text-sm text-muted-foreground">Levels</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why European Languages */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-bold text-3xl sm:text-4xl mb-8 text-center text-foreground">
              Why Learn European Languages?
            </h2>
            <div className="space-y-6">
              <Card className="border-card-border">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-3 text-foreground">Career Opportunities</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    European languages open doors to international careers, business opportunities, and global organizations. 
                    Multilingual professionals are highly valued in today's global economy.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-card-border">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-3 text-foreground">Education & Travel</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Study at prestigious European universities or explore the continent with confidence. 
                    Language skills enhance your travel experiences and academic opportunities.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-card-border">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-3 text-foreground">Cultural Enrichment</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Connect with rich European cultures, literature, and arts in their original languages. 
                    Gain deeper understanding and appreciation of diverse perspectives.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-bold text-3xl sm:text-4xl mb-6">Our Location</h2>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-8 border border-primary-foreground/20">
              <div className="space-y-2 text-primary-foreground/90">
                <p className="font-semibold text-lg text-primary-foreground">{INSTITUTE_INFO.name}</p>
                <p>{INSTITUTE_INFO.address.line1}</p>
                <p>{INSTITUTE_INFO.address.line2}</p>
                <p>POSTAL CODE: {INSTITUTE_INFO.address.postalCode}</p>
                <p>{INSTITUTE_INFO.address.city} - {INSTITUTE_INFO.address.country}</p>
                <p>POST BOX NO. {INSTITUTE_INFO.address.postBox}</p>
                <p className="pt-4">TEL: {INSTITUTE_INFO.contact.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
