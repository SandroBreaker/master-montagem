
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Wrench, DollarSign, ShieldCheck } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Clock,
      title: 'Pontualidade Britânica',
      description: 'Respeitamos seu tempo acima de tudo. Chegamos no horário marcado e finalizamos com agilidade.'
    },
    {
      icon: Wrench,
      title: 'Ferramental Pro',
      description: 'Utilizamos parafusadeiras e níveis de precisão industrial para garantir durabilidade e ajuste fino.'
    },
    {
      icon: DollarSign,
      title: 'Orçamento Transparente',
      description: 'Preço justo, sem taxas ocultas. Valorizamos a relação de confiança com o cliente.'
    },
    {
      icon: ShieldCheck,
      title: 'Garantia de Mestre',
      description: '90 dias de cobertura total sobre a montagem. Sua paz de espírito é nossa prioridade.'
    }
  ];

  return (
    <section id="features" className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-200/60 hover:border-amber-500/30 hover:bg-white hover:shadow-[0_20px_60px_-15px_rgba(245,158,11,0.12)] transition-all duration-500 group relative overflow-hidden"
            >
              {/* Card Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-[4rem] group-hover:bg-amber-500/10 transition-colors"></div>

              <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-amber-500 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl shadow-slate-900/10 group-hover:shadow-amber-500/20">
                <feature.icon className="text-amber-500 group-hover:text-slate-950 transition-colors" size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4 text-slate-900 tracking-tighter">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
