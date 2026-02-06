
import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

const MobileStickyCTA: React.FC = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[60] p-4 pointer-events-none">
      <div className="flex gap-3 pointer-events-auto max-w-md mx-auto">
        <a 
          href="tel:5511987654321"
          className="flex-1 bg-slate-900 text-white py-4 rounded-2xl flex items-center justify-center gap-2 shadow-2xl font-black text-sm uppercase tracking-wider active:scale-95 transition-transform"
        >
          <Phone size={18} />
          Ligar
        </a>
        <a 
          href="https://wa.me/5500000000000"
          className="flex-[2] bg-amber-500 text-slate-950 py-4 rounded-2xl flex items-center justify-center gap-2 shadow-2xl font-black text-sm uppercase tracking-wider active:scale-95 transition-transform"
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>
      </div>
      {/* Safe Area Spacer for iOS etc */}
      <div className="h-safe-bottom" />
    </div>
  );
};

export default MobileStickyCTA;
