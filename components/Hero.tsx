
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ShieldCheck, Star, Sparkles, Clock3 } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-32 md:pt-0 overflow-hidden bg-slate-950">
      {/* Background with Motion */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1581404917879-53e19259fdda?auto=format&fit=crop&q=80&w=2400" 
          alt="Montagem Profissional" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
      </motion.div>

      <div className="container mx-auto px-8 relative z-10">
        <div className="max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-amber-500 px-5 py-2.5 rounded-2xl mb-10 backdrop-blur-xl shadow-2xl">
              <Star size={16} fill="currentColor" className="animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.3em]">Serviço Nível Elite</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[9rem] font-black text-white leading-[0.95] mb-10 tracking-tighter select-none">
              MONTAGEM <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-200 italic">IMPECÁVEL.</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-300 mb-12 max-w-3xl leading-relaxed font-medium">
              A técnica apurada que o seu projeto exige. Especialista em móveis de alto padrão com acabamento milimétrico.
            </p>

            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-8 mb-16">
              <a 
                href="https://wa.me/5511968036476" 
                target="_blank"
                className="group relative bg-amber-500 hover:bg-amber-400 text-slate-950 px-10 py-5 rounded-[1.5rem] font-black text-lg flex items-center justify-center gap-4 transition-all hover:scale-[1.05] active:scale-95 shadow-2xl shadow-amber-500/20"
              >
                Solicitar Orçamento Agora
                <ChevronRight className="group-hover:translate-x-2 transition-transform duration-300" size={24} />
              </a>
              
              <div className="flex flex-col gap-2 px-6 border-l border-white/10">
                <div className="flex items-center gap-3 text-slate-400 text-[11px] font-black uppercase tracking-widest">
                  <ShieldCheck size={18} className="text-amber-500" />
                  Garantia de 90 dias
                </div>
                <div className="flex items-center gap-3 text-slate-400 text-[11px] font-black uppercase tracking-widest">
                  <Sparkles size={18} className="text-amber-500" />
                  Ambiente Limpo e Organizado
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-10 border-t border-white/5 pt-12">
              <div className="flex items-center gap-4 group cursor-default">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/5">
                  <Clock3 className="text-amber-500" size={20} />
                </div>
                <div>
                  <p className="text-xl text-white font-black leading-none">Rápido</p>
                  <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mt-1">Retorno em 15min</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-default">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/5">
                  <Star className="text-amber-500" size={20} fill="currentColor" />
                </div>
                <div>
                  <p className="text-xl text-white font-black leading-none">5.0/5</p>
                  <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mt-1">Google Reviews</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
