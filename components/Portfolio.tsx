
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';

const PortfolioItem = ({ project, index }: { project: any, index: number }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-3xl aspect-[4/3] bg-slate-200 active:scale-95 transition-transform"
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
        </div>
      )}
      
      <img 
        src={project.image_url} 
        alt={project.title} 
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent lg:opacity-0 lg:group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 md:p-8">
        <span className="text-amber-500 font-black text-xs md:text-sm mb-1 md:mb-2 uppercase tracking-[0.2em]">{project.category}</span>
        <h4 className="text-white text-xl md:text-2xl font-black leading-tight tracking-tight">{project.title}</h4>
      </div>
    </motion.div>
  );
};

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const { data } = await supabase.from('portfolio_items').select('*').order('order_index', { ascending: true });
      if (data) setProjects(data);
      setLoading(false);
    };
    fetchPortfolio();
  }, []);

  return (
    <section id="portfolio" className="py-24 bg-slate-50 scroll-mt-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-amber-500 font-black tracking-[0.2em] uppercase text-xs mb-4">Galeria de Trabalhos</h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
              Transformando espaços com <span className="text-amber-500 italic">precisão</span>.
            </h3>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-[4/3] bg-slate-200 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <PortfolioItem key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
