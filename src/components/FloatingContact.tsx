import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { INSTITUTE_INFO } from "@shared/schema";

export default function FloatingContact() {
  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello! I'm interested in learning European languages at your institute.");
    window.open(`https://wa.me/${INSTITUTE_INFO.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${message}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* WhatsApp Button */}
      <Button
        onClick={handleWhatsApp}
        className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
        size="icon"
      >
        <MessageCircle className="w-8 h-8 text-white" />
        <span className="sr-only">Contact via WhatsApp</span>
        {/* Tooltip */}
        <div className="absolute right-full mr-3 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Chat on WhatsApp
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
        </div>
      </Button>
    </div>
  );
}