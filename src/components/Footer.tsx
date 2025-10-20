import { Link } from "wouter";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { INSTITUTE_INFO } from "@shared/schema";

export default function Footer() {
  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/verify", label: "Verify Certificate" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">About Us</h3>
            <p className="text-primary-foreground/90 text-sm leading-relaxed">
              {INSTITUTE_INFO.name} offers professional language training in French, German, Spanish, Italian, and English. 
              We provide comprehensive courses from beginner to advanced levels (A1-C2).
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-primary-foreground/90 hover:text-primary-foreground text-sm hover-elevate inline-block py-1 px-2 -ml-2 rounded-md transition-colors cursor-pointer" data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-primary-foreground/90">
                  <p>{INSTITUTE_INFO.address.line1}</p>
                  <p>{INSTITUTE_INFO.address.line2}</p>
                  <p>POSTAL CODE: {INSTITUTE_INFO.address.postalCode}</p>
                  <p>{INSTITUTE_INFO.address.city} - {INSTITUTE_INFO.address.country}</p>
                  <p>POST BOX NO. {INSTITUTE_INFO.address.postBox}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a 
                  href={`tel:${INSTITUTE_INFO.contact.phone}`} 
                  className="text-sm text-primary-foreground/90 hover:text-primary-foreground hover-elevate px-2 py-1 -ml-2 rounded-md"
                  data-testid="footer-phone"
                >
                  {INSTITUTE_INFO.contact.phone}
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a 
                  href={`mailto:${INSTITUTE_INFO.contact.email}`} 
                  className="text-sm text-primary-foreground/90 hover:text-primary-foreground hover-elevate px-2 py-1 -ml-2 rounded-md"
                  data-testid="footer-email"
                >
                  {INSTITUTE_INFO.contact.email}
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 flex-shrink-0" />
                <a 
                  href={`https://wa.me/${INSTITUTE_INFO.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-foreground/90 hover:text-primary-foreground hover-elevate px-2 py-1 -ml-2 rounded-md"
                  data-testid="footer-whatsapp"
                >
                  WhatsApp: {INSTITUTE_INFO.contact.whatsapp}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-primary-foreground/20">
          <p className="text-center text-sm text-primary-foreground/80">
            © {new Date().getFullYear()} {INSTITUTE_INFO.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
