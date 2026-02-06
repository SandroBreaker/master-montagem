
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppButton: React.FC = () => {
  return (
    /* Apply any cast to motion props to resolve environment-specific type mismatches */
    <motion.div
      {...({
        initial: { y: 100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { delay: 1.5, type: 'spring', damping: 20 }
      } as any)}
      className="fixed bottom-6 right-6 z-50"
    >
      <a 
        href="https://wa.me/5500000000000" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group flex items-center gap-3 active:scale-90 transition-transform"
        aria-label="Contatar montador via WhatsApp"
      >
        <div className="bg-white px-4 py-2 rounded-full shadow-xl text-slate-900 font-bold text-sm hidden md:block opacity-0 group-hover:opacity-100 transition-all border border-slate-100 translate-x-4 group-hover:translate-x-0">
          Orçamento no WhatsApp
        </div>
        <div className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all animate-bounce-slow relative">
          <MessageSquare size={32} fill="currentColor" />
          <span className="absolute -top-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-amber-500 text-[10px] items-center justify-center text-slate-900 font-black">1</span>
          </span>
        </div>
      </a>
      
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </motion.div>
  );
};

export default WhatsAppButton;
