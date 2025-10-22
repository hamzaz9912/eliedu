import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, CheckCircle2, Sparkles, Users, Calendar, Star } from "lucide-react";
import { INSTITUTE_INFO } from "@/shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactForm } from "@/shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: ContactForm) => {
    contactMutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      value: INSTITUTE_INFO.contact.phone,
      href: `tel:${INSTITUTE_INFO.contact.phone}`,
    },
    {
      icon: Mail,
      title: "Email",
      value: INSTITUTE_INFO.contact.email,
      href: `mailto:${INSTITUTE_INFO.contact.email}`,
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: INSTITUTE_INFO.contact.whatsapp,
      href: `https://wa.me/${INSTITUTE_INFO.contact.whatsapp.replace(/[^0-9]/g, "")}`,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-16 sm:py-20 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gold/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full px-4 py-2 mb-6">
            <MessageCircle className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium text-gold-foreground">Contact Us</span>
          </div>

          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl mb-6">
            Let's Start Your Language Journey
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
            Ready to master a European language? Our expert instructors are waiting to guide you every step of the way.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-primary-foreground/80">
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">24/7</div>
              <div className="text-sm">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">5</div>
              <div className="text-sm">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">Free</div>
              <div className="text-sm">Consultation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="border-card-border shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-gold/5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Send className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  </div>
                  <p className="text-muted-foreground">Get personalized guidance for your language learning journey</p>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your full name"
                                {...field}
                                data-testid="input-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your.email@example.com"
                                {...field}
                                data-testid="input-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="+971-xxx-xxxx"
                                {...field}
                                data-testid="input-phone"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your language learning goals..."
                                rows={5}
                                {...field}
                                data-testid="input-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-gold to-gold/90 text-gold-foreground hover:from-gold/90 hover:to-gold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                        disabled={contactMutation.isPending}
                        data-testid="button-submit-contact"
                      >
                        {contactMutation.isPending ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin w-4 h-4 border-2 border-gold-foreground border-t-transparent rounded-full"></div>
                            Sending...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Send className="w-4 h-4" />
                            Send Message
                            <Sparkles className="w-4 h-4" />
                          </div>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info & Map */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="border-card-border hover-elevate hover:shadow-lg transition-all duration-300 group" data-testid={`card-contact-${index}`}>
                    <CardContent className="p-6">
                      <a
                        href={info.href}
                        target={info.href.startsWith("http") ? "_blank" : undefined}
                        rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-4 group-hover:text-primary transition-colors"
                      >
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                          <info.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-muted-foreground mb-1 group-hover:text-primary/80 transition-colors">{info.title}</div>
                          <div className="text-foreground font-medium">{info.value}</div>
                        </div>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        </div>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Office Hours */}
              <Card className="border-card-border shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-muted-foreground mb-3">Office Hours</div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center gap-4 p-2 bg-muted/30 rounded-lg">
                          <span className="text-muted-foreground text-sm">Sunday - Thursday:</span>
                          <span className="text-foreground font-medium bg-primary/10 px-2 py-1 rounded text-sm">9:00 AM - 8:00 PM</span>
                        </div>
                        <div className="flex justify-between items-center gap-4 p-2 bg-muted/30 rounded-lg">
                          <span className="text-muted-foreground text-sm">Saturday:</span>
                          <span className="text-foreground font-medium bg-primary/10 px-2 py-1 rounded text-sm">10:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between items-center gap-4 p-2 bg-red-50 rounded-lg">
                          <span className="text-muted-foreground text-sm">Friday:</span>
                          <span className="text-red-600 font-medium bg-red-100 px-2 py-1 rounded text-sm">Closed</span>
                        </div>
                      </div>
                      <div className="mt-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                        <p className="text-xs text-primary font-medium flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Response within 24 hours
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card className="border-card-border">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-muted-foreground mb-2">Our Location</div>
                      <div className="text-sm text-foreground space-y-1">
                        <p>{INSTITUTE_INFO.address.line1}</p>
                        <p>{INSTITUTE_INFO.address.line2}</p>
                        <p>POSTAL CODE: {INSTITUTE_INFO.address.postalCode}</p>
                        <p>{INSTITUTE_INFO.address.city} - {INSTITUTE_INFO.address.country}</p>
                        <p>POST BOX NO. {INSTITUTE_INFO.address.postBox}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Google Maps Embed */}
                  <div className="mt-4 rounded-lg overflow-hidden border border-border">
                    <iframe
                      src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.3654806947254!2d${INSTITUTE_INFO.location.lng}!3d${INSTITUTE_INFO.location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDIwJzQ2LjciTiA1NcKwMjUnMTUuMiJF!5e0!3m2!1sen!2sae!4v1234567890`}
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Institute Location"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
