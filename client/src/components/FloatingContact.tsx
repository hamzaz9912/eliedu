import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";
import { INSTITUTE_INFO } from "@/shared/schema";
import { useState, useEffect } from "react";

export default function FloatingContact() {
  const [isHovered, setIsHovered] = useState(false);
  const [showPulse, setShowPulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPulse(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello! I'm interested in learning European languages at your institute.");
    window.open(`https://wa.me/${INSTITUTE_INFO.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${message}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* WhatsApp Button */}
      <div className="relative">
        {/* Pulse animation background */}
        {showPulse && (
          <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></div>
        )}

        <Button
          onClick={handleWhatsApp}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-2xl hover:shadow-green-500/25 transition-all duration-500 transform hover:scale-110 hover:rotate-12 group border-2 border-white/20"
          size="icon"
        >
          <MessageCircle className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
          <span className="sr-only">Contact via WhatsApp</span>

          {/* Floating particles */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: '0.2s' }}></div>

          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-full"></div>
        </Button>

        {/* Enhanced Tooltip */}
        <div className={`absolute right-full mr-3 px-4 py-2 bg-gray-900/95 backdrop-blur-md text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-xl border border-white/10 transform translate-x-2 group-hover:translate-x-0 ${isHovered ? 'scale-105' : 'scale-100'}`}>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-green-400" />
            <span className="font-medium">Chat on WhatsApp</span>
          </div>
          <div className="text-xs text-gray-300 mt-1">+43 676 650 8596</div>
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900/95"></div>
        </div>
      </div>
    </div>
  );
}