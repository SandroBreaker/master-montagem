
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Briefcase, Tv, Hammer, Layers, Home } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const IconMap: Record<string, any> = { Layout, Briefcase, Tv, Hammer, Layers, Home };

const Services: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase.from('services').select('*').order('order_index', { ascending: true });
      if (data) setServices(data);
      setLoading(false);
    };
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-32 bg-slate-950 text-white overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="container mx-auto px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8">
          <div className="max-w-3xl">
            <h2 className="text-amber-500 font-black tracking-[0.4em] uppercase text-xs mb-6">Nossa Expertise</h2>
            <h3 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter">
              Soluções técnicas de <br />
              <span className="text-amber-500">alta performance</span>.
            </h3>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-80 bg-white/5 rounded-[3rem] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = IconMap[service.icon_name] || Hammer;
              return (
                <motion.div 
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group p-12 rounded-[3rem] bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/5 hover:border-amber-500/40 hover:shadow-[0_40px_80px_-20px_rgba(245,158,11,0.15)] transition-all duration-700 hover:-translate-y-4"
                >
                  <div className="mb-10 w-20 h-20 bg-slate-900 rounded-[1.5rem] flex items-center justify-center border border-white/5 group-hover:bg-amber-500 group-hover:rotate-[10deg] transition-all duration-500">
                    <Icon className="text-amber-500 group-hover:text-slate-950 transition-colors" size={36} />
                  </div>
                  <h4 className="text-3xl font-black mb-6 group-hover:text-amber-500 transition-colors tracking-tight">{service.title}</h4>
                  <p className="text-slate-400 leading-relaxed text-lg font-medium group-hover:text-slate-300 transition-colors">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
