
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border-b border-slate-200 transition-all ${isOpen ? 'bg-amber-50/50' : ''}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left px-4 group"
      >
        <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-amber-600' : 'text-slate-900'}`}>
          {question}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-amber-500 text-slate-900 rotate-180' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-6 px-4 text-slate-600 leading-relaxed font-medium">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: 'Atendem aos sábados e feriados?',
      answer: 'Sim! Sabemos que muitos clientes só têm disponibilidade nos finais de semana. Atendemos aos sábados mediante agendamento prévio, sem taxas abusivas.'
    },
    {
      question: 'Quais formas de pagamento são aceitas?',
      answer: 'Aceitamos Pix, cartões de crédito (com parcelamento) e débito. O pagamento é realizado apenas após a finalização e conferência do serviço pelo cliente.'
    },
    {
      question: 'Fazem desmontagem para mudanças?',
      answer: 'Com certeza. Realizamos a desmontagem técnica, organização dos parafusos e ferragens, e a remontagem no novo endereço para garantir que o móvel não seja danificado.'
    },
    {
      question: 'Oferecem garantia do serviço?',
      answer: 'Sim, oferecemos 90 dias de garantia total sobre a montagem. Se qualquer porta desregular ou gaveta apresentar problemas, voltamos para ajustar sem custo adicional.'
    },
    {
      question: 'Vocês levam as ferramentas necessárias?',
      answer: 'Sim, possuímos ferramentário profissional completo: parafusadeiras de alto torque, níveis a laser para alinhamento perfeito e ferramentas de precisão para ajustes finos.'
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-600 px-4 py-2 rounded-full mb-6">
              <HelpCircle size={16} />
              <span className="text-xs font-black uppercase tracking-widest">Dúvidas Frequentes</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
              Perguntas que <span className="text-amber-500">importam</span>
            </h2>
          </div>
          
          <div className="bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-100">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-500 mb-6 font-medium">Ainda tem dúvidas? Fale direto conosco agora mesmo.</p>
            <a 
              href="https://wa.me/5500000000000" 
              className="text-amber-600 font-black uppercase tracking-widest text-sm hover:underline"
            >
              Conversar no WhatsApp →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
