
import React, { useState, useEffect } from 'react';
import { Menu, X, Hammer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Serviços', href: '#services' },
    { name: 'Portfólio', href: '#portfolio' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-2xl py-4 border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]' : 'bg-transparent py-8 border-b border-transparent'}`}>
      {/* Scroll Progress Bar */}
      <div className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 transition-all duration-150 z-50 shadow-[0_0_10px_rgba(245,158,11,0.5)]" style={{ width: `${scrollProgress}%` }} />

      <div className="container mx-auto px-8 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group transition-transform active:scale-95">
          <div className="bg-amber-500 p-2.5 rounded-2xl group-hover:rotate-[15deg] transition-transform duration-500 shadow-lg shadow-amber-500/20">
            <Hammer size={26} className="text-slate-950" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white uppercase italic">
            Master<span className="text-amber-500">Montagem</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="relative text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a 
            href="https://wa.me/5500000000000" 
            target="_blank" 
            className="relative overflow-hidden group bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-xl shadow-amber-500/10 hover:shadow-amber-500/30 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              Solicitar Orçamento
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 active:scale-90 transition-transform"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="md:hidden fixed inset-0 z-[100] bg-slate-950 flex flex-col p-10 h-screen"
          >
            <div className="flex justify-end mb-12">
              <button onClick={() => setIsMenuOpen(false)} className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 text-white">
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-10">
              {navLinks.map((link, i) => (
                <motion.a 
                  key={link.name} 
                  href={link.href} 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-5xl font-black text-white hover:text-amber-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
