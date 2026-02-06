
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Check, Copy, Download, Files, Search, Filter } from 'lucide-react';

interface FileData {
  name: string;
  path: string;
  extension: string;
}

const ContextBundler: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [files, setFiles] = useState<FileData[]>([
    { name: 'index.html', path: './index.html', extension: '.html' },
    { name: 'index.tsx', path: './index.tsx', extension: '.tsx' },
    { name: 'App.tsx', path: './App.tsx', extension: '.tsx' },
    { name: 'metadata.json', path: './metadata.json', extension: '.json' },
    { name: 'Header.tsx', path: './components/Header.tsx', extension: '.tsx' },
    { name: 'Hero.tsx', path: './components/Hero.tsx', extension: '.tsx' },
    { name: 'Features.tsx', path: './components/Features.tsx', extension: '.tsx' },
    { name: 'Services.tsx', path: './components/Services.tsx', extension: '.tsx' },
    { name: 'Portfolio.tsx', path: './components/Portfolio.tsx', extension: '.tsx' },
    { name: 'Testimonials.tsx', path: './components/Testimonials.tsx', extension: '.tsx' },
    { name: 'Footer.tsx', path: './components/Footer.tsx', extension: '.tsx' },
    { name: 'WhatsAppButton.tsx', path: './components/WhatsAppButton.tsx', extension: '.tsx' },
    { name: 'ContextBundler.tsx', path: './components/ContextBundler.tsx', extension: '.tsx' },
    { name: 'FAQ.tsx', path: './components/FAQ.tsx', extension: '.tsx' },
    { name: 'MobileStickyCTA.tsx', path: './components/MobileStickyCTA.tsx', extension: '.tsx' },
    { name: 'ContactForm.tsx', path: './components/ContactForm.tsx', extension: '.tsx' },
    { name: 'ImageUpload.tsx', path: './components/ImageUpload.tsx', extension: '.tsx' },
    { name: 'supabase_schema.sql', path: './supabase_schema.sql', extension: '.sql' },
    { name: 'supabase_storage_schema.sql', path: './supabase_storage_schema.sql', extension: '.sql' },
  ]);

  const [selectedPaths, setSelectedPaths] = useState<string[]>(files.map(f => f.path));
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFile = (path: string) => {
    setSelectedPaths(prev => 
      prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]
    );
  };

  const toggleAll = () => {
    if (selectedPaths.length === files.length) {
      setSelectedPaths([]);
    } else {
      setSelectedPaths(files.map(f => f.path));
    }
  };

  const generateContent = async () => {
    let output = `# PROJECT CONTEXT - Gerado em: ${new Date().toLocaleString('pt-BR')}\n`;
    for (const path of selectedPaths) {
      output += `\n================================================================================\n`;
      output += `FILE: ${path}\n`;
      output += `================================================================================\n`;
      try {
        const response = await fetch(path.replace('./', '/'));
        if (response.ok) {
          const text = await response.text();
          output += text;
        } else {
          output += `// Conteúdo do arquivo ${path} (Simulado para fins de demonstração)`;
        }
      } catch (e) {
        output += `// Erro ao ler arquivo: ${path}`;
      }
      output += `\n`;
    }
    return output;
  };

  const handleCopy = async () => {
    const content = await generateContent();
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    const content = await generateContent();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '_project_context.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredFiles = files.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.path.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />
      <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-4xl max-h-[85vh] bg-slate-900 border border-slate-800 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden">
        <div className="p-6 md:p-8 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Files className="text-slate-950" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-tighter">Project Bundler</h2>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Compilador de Contexto v1.1</p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>
        <div className="p-4 md:px-8 border-b border-slate-800 bg-slate-900/30 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
            <input type="text" placeholder="Buscar arquivos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-300 focus:border-amber-500/50 outline-none transition-colors" />
          </div>
          <button onClick={toggleAll} className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-white uppercase transition-colors flex items-center justify-center gap-2">
            <Filter size={14} />
            {selectedPaths.length === files.length ? 'Desmarcar Todos' : 'Selecionar Todos'}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredFiles.map((file, index) => (
              <motion.div key={file.path} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.03 }} onClick={() => toggleFile(file.path)} className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer select-none ${selectedPaths.includes(file.path) ? 'bg-amber-500/10 border-amber-500/30' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}`}>
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${selectedPaths.includes(file.path) ? 'bg-amber-500' : 'bg-slate-800'}`}>
                  {selectedPaths.includes(file.path) && <Check size={14} className="text-slate-950 font-bold" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold truncate transition-colors ${selectedPaths.includes(file.path) ? 'text-amber-500' : 'text-slate-300'}`}>{file.name}</p>
                  <p className="text-[10px] text-slate-600 truncate uppercase font-medium">{file.path}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="p-6 md:p-8 border-t border-slate-800 bg-slate-950 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start text-white">
            <p className="font-black text-lg">{selectedPaths.length} <span className="text-slate-500 font-bold text-sm">Arquivos</span></p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button onClick={handleCopy} disabled={selectedPaths.length === 0} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 rounded-2xl text-white font-black uppercase text-xs transition-all active:scale-95">
              {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
              {copied ? 'Copiado!' : 'Copiar'}
            </button>
            <button onClick={handleDownload} disabled={selectedPaths.length === 0} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 rounded-2xl text-slate-950 font-black uppercase text-xs transition-all active:scale-95">
              <Download size={18} />
              Baixar .txt
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContextBundler;
