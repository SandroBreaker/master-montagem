
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Carla Silveira',
      role: 'Arquiteta',
      text: 'Trabalho impecável. Contratei para um projeto de um cliente e o montador foi extremamente cuidadoso com as peças e muito pontual. Recomendo fortemente.',
      stars: 5,
      image: 'https://picsum.photos/seed/p1/100/100'
    },
    {
      name: 'Ricardo Mendes',
      role: 'Empresário',
      text: 'Precisava de uma montagem rápida para o meu novo escritório. O serviço foi feito em tempo recorde e com uma qualidade superior. Ótimo custo-benefício.',
      stars: 5,
      image: 'https://picsum.photos/seed/p2/100/100'
    },
    {
      name: 'Ana Paula Costa',
      role: 'Dona de Casa',
      text: 'Excelente profissional. Montou meu guarda-roupa de 6 portas sozinho e ficou perfeito. Além de tudo, deixou o local limpo após terminar.',
      stars: 5,
      image: 'https://picsum.photos/seed/p3/100/100'
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-4">Depoimentos</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900">
            O que dizem nossos <span className="text-amber-500">clientes</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            /* Use any cast to ensure Framer Motion props are accepted regardless of environment type definition mismatches */
            <motion.div 
              key={index}
              {...({
                initial: { opacity: 0, scale: 0.9 },
                whileInView: { opacity: 1, scale: 1 },
                viewport: { once: true },
                transition: { delay: index * 0.1 }
              } as any)}
              className="p-10 rounded-3xl bg-slate-50 border border-slate-100 relative"
            >
              <Quote className="absolute top-6 right-6 text-slate-200" size={40} />
              <div className="flex gap-1 mb-6">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} size={18} fill="#f59e0b" className="text-amber-500" />
                ))}
              </div>
              <p className="text-slate-600 mb-8 italic leading-relaxed">
                "{review.text}"
              </p>
              <div className="flex items-center gap-4">
                <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-slate-900">{review.name}</h4>
                  <p className="text-slate-500 text-sm">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;