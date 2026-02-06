
import React from 'react';
import { Hammer, Instagram, Facebook, Mail, Phone, MapPin, Code } from 'lucide-react';

interface FooterProps {
  onOpenBundler?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenBundler }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & About */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-amber-500 p-2 rounded-lg">
                <Hammer size={24} className="text-slate-900" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white uppercase italic">
                MASTER<span className="text-amber-500">MONTAGEM</span>
              </span>
            </div>
            <p className="mb-6 leading-relaxed max-w-sm">
              Especialistas em dar vida ao seu projeto. Montagem de móveis com qualidade técnica, ferramentas profissionais e compromisso com o resultado final.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-all active:scale-90">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-all active:scale-90">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Navegação</h4>
            <ul className="space-y-4">
              <li><a href="#home" className="hover:text-amber-500 transition-colors active:translate-x-1 inline-block">Início</a></li>
              <li><a href="#services" className="hover:text-amber-500 transition-colors active:translate-x-1 inline-block">Nossos Serviços</a></li>
              <li><a href="#portfolio" className="hover:text-amber-500 transition-colors active:translate-x-1 inline-block">Trabalhos Realizados</a></li>
              <li><a href="#testimonials" className="hover:text-amber-500 transition-colors active:translate-x-1 inline-block">Depoimentos</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-amber-500 mt-1 shrink-0" />
                <span className="hover:text-amber-500 transition-colors cursor-pointer active:scale-[0.98] inline-block">(11) 98765-4321</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-amber-500 mt-1 shrink-0" />
                <span className="break-all hover:text-amber-500 transition-colors cursor-pointer active:scale-[0.98] inline-block">contato@mastermontagem.com.br</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-amber-500 mt-1 shrink-0" />
                <span>Atendemos em São Paulo e Região Metropolitana</span>
              </li>
            </ul>
          </div>

          {/* Áreas de Atuação */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Onde Atuamos</h4>
            <div className="flex flex-wrap gap-2">
              {['Moema', 'Jardins', 'Pinheiros', 'Morumbi', 'Itaim Bibi', 'Barueri', 'Alphaville', 'Santo André', 'São Bernardo'].map((city) => (
                <span key={city} className="text-xs px-3 py-1 bg-slate-800 rounded-full text-slate-400 hover:bg-amber-500/20 hover:text-amber-500 transition-colors cursor-default">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} MasterMontagem. Todos os direitos reservados.</p>
          <button 
            onClick={onOpenBundler}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5 group active:scale-95"
          >
            <Code size={14} className="group-hover:text-amber-500" />
            <span>Gerar Contexto do Projeto</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
