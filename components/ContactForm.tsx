
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, MessageCircle, Hammer, CheckCircle } from 'lucide-react';
import { trackAndRedirect } from '../lib/leadTracker';

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    service: 'Montagem Geral',
    whatsapp: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await trackAndRedirect(formData.name, formData.service);
      setIsSuccess(true);
      setFormData({ name: '', service: 'Montagem Geral', whatsapp: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-slate-900 relative overflow-hidden">
      <div className="container mx-auto px-8 relative z-10">
        <div className="max-w-5xl mx-auto bg-slate-950 rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          
          {/* Info Side */}
          <div className="lg:w-2/5 p-12 lg:p-16 bg-gradient-to-br from-amber-600 to-amber-500 flex flex-col justify-between relative overflow-hidden">
             <div className="relative z-10">
                <h3 className="text-4xl font-black text-slate-950 leading-tight mb-6">Peça seu orçamento em <span className="underline">60 segundos</span>.</h3>
                <p className="text-slate-900/80 font-bold text-lg mb-10 italic">"Qualidade não é um diferencial, é nossa obrigação."</p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-slate-950 font-black uppercase text-xs tracking-widest">
                    <CheckCircle size={20} /> Atendimento imediato
                  </div>
                  <div className="flex items-center gap-4 text-slate-950 font-black uppercase text-xs tracking-widest">
                    <CheckCircle size={20} /> Visita técnica grátis*
                  </div>
                  <div className="flex items-center gap-4 text-slate-950 font-black uppercase text-xs tracking-widest">
                    <CheckCircle size={20} /> Garantia de 3 meses
                  </div>
                </div>
             </div>
             <Hammer size={200} className="absolute -bottom-10 -right-10 text-slate-950/10 -rotate-12" />
          </div>

          {/* Form Side */}
          <div className="lg:w-3/5 p-12 lg:p-16">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <label className="block text-[10px] font-black uppercase text-slate-500 mb-3 ml-1 tracking-widest">Seu Nome</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: João Silva"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 outline-none focus:border-amber-500/50 transition-all"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-[10px] font-black uppercase text-slate-500 mb-3 ml-1 tracking-widest">Tipo de Móvel</label>
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white outline-none focus:border-amber-500/50 transition-all appearance-none cursor-pointer"
                    value={formData.service}
                    onChange={e => setFormData({...formData, service: e.target.value})}
                  >
                    <option className="bg-slate-950" value="Montagem Geral">Montagem Geral</option>
                    <option className="bg-slate-950" value="Cozinha Planejada">Cozinha Planejada</option>
                    <option className="bg-slate-950" value="Dormitório/Guarda-roupa">Dormitório / Guarda-roupa</option>
                    <option className="bg-slate-950" value="Escritório">Escritório</option>
                    <option className="bg-slate-950" value="Instalações TV/Quadros">Instalações (TV/Quadros)</option>
                  </select>
                </div>
              </div>

              <div className="relative">
                <label className="block text-[10px] font-black uppercase text-slate-500 mb-3 ml-1 tracking-widest">WhatsApp / Telefone</label>
                <div className="relative">
                  <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                  <input 
                    type="tel" 
                    required
                    placeholder="(11) 99999-9999"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 outline-none focus:border-amber-500/50 transition-all"
                    value={formData.whatsapp}
                    onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 py-5 rounded-2xl font-black uppercase text-sm tracking-[0.2em] flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-amber-500/10 disabled:opacity-50"
              >
                {isSubmitting ? 'Processando...' : isSuccess ? 'Enviado com Sucesso!' : 'Enviar para o WhatsApp'}
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-[120px] -z-10 rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 blur-[120px] -z-10 rounded-full"></div>
    </section>
  );
};

export default ContactForm;
