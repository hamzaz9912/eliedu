import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, GraduationCap } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/verify", label: "Verify Certificate" },
  ];

  // Check if user is logged in
  const userToken = localStorage.getItem('user_token');
  const adminToken = localStorage.getItem('admin_token');
  const isUserLoggedIn = !!userToken;
  const isAdminLoggedIn = !!adminToken;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3">
            <GraduationCap className="w-8 h-8 text-primary" />
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none text-foreground">European Languages</span>
              <span className="text-xs text-muted-foreground">Institute</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={location === link.href ? "secondary" : "ghost"}
                  size="sm"
                  data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            {isUserLoggedIn ? (
              <Link href="/dashboard">
                <Button
                  className="bg-green-600 text-white hover:bg-green-700"
                  data-testid="button-dashboard"
                >
                  My Dashboard
                </Button>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    data-testid="button-login"
                  >
                    Student Login
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button
                    className="bg-gold text-gold-foreground hover:bg-gold"
                    data-testid="button-enroll-now"
                  >
                    Enroll Now
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant={location === link.href ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
              {isUserLoggedIn ? (
                <Link href="/dashboard">
                  <Button
                    className="w-full bg-green-600 text-white hover:bg-green-700 mt-2"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="button-mobile-dashboard"
                  >
                    My Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="w-full mt-2"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid="button-mobile-login"
                    >
                      Student Login
                    </Button>
                  </Link>
                  <Link href="/courses">
                    <Button
                      className="w-full bg-gold text-gold-foreground hover:bg-gold mt-2"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid="button-mobile-enroll"
                    >
                      Enroll Now
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
