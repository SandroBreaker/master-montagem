
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, Briefcase, Settings, LogOut, Plus, 
  TrendingUp, CheckCircle2, MessageSquare, Search, Bell, 
  Image as ImageIcon, Wrench, Trash2, Edit3, X, Save
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import ImageUpload from '../components/ImageUpload';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'leads' | 'services' | 'portfolio'>('leads');
  const [data, setData] = useState<{ leads: any[], services: any[], portfolio: any[] }>({
    leads: [],
    services: [],
    portfolio: []
  });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const [leadsRes, servicesRes, portfolioRes] = await Promise.all([
        supabase.from('leads').select('*').order('created_at', { ascending: false }),
        supabase.from('services').select('*').order('order_index', { ascending: true }),
        supabase.from('portfolio_items').select('*').order('order_index', { ascending: true })
      ]);

      setData({
        leads: leadsRes.data || [],
        services: servicesRes.data || [],
        portfolio: portfolioRes.data || []
      });
    } catch (err) {
      console.error("Erro ao carregar dados do banco:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (table: string, id: string) => {
    if (!confirm('Tem certeza que deseja excluir este item?')) return;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (!error) fetchContent();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const payload: any = Object.fromEntries(formData.entries());
    
    if (activeTab === 'portfolio') {
      payload.image_url = uploadedImageUrl || editingItem?.image_url;
      if (!payload.image_url) {
        alert('Por favor, faça upload de uma imagem.');
        return;
      }
    }
    
    const table = activeTab === 'services' ? 'services' : 'portfolio_items';
    
    if (editingItem?.id) {
      await supabase.from(table).update(payload).eq('id', editingItem.id);
    } else {
      await supabase.from(table).insert([payload]);
    }
    
    setIsModalOpen(false);
    setEditingItem(null);
    setUploadedImageUrl('');
    fetchContent();
  };

  const handleLogout = async () => {
    // Limpa tanto a sessão real quanto o bypass
    localStorage.removeItem('master_admin_mock_user');
    await (supabase.auth as any).signOut();
    window.location.reload(); // Força o redirecionamento via App.tsx
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex font-sans">
      {/* Sidebar */}
      <aside className="w-80 bg-slate-900/50 backdrop-blur-xl border-r border-white/5 p-8 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-12 text-white">
          <div className="bg-amber-500 p-2.5 rounded-xl">
            <LayoutDashboard size={24} className="text-slate-950" />
          </div>
          <span className="text-xl font-black italic uppercase tracking-tighter">Admin<span className="text-amber-500">Master</span></span>
        </div>

        <nav className="space-y-3 flex-1">
          <button 
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'leads' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:bg-white/5'}`}
          >
            <Users size={20} /> Leads
          </button>
          <button 
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'services' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:bg-white/5'}`}
          >
            <Wrench size={20} /> Serviços
          </button>
          <button 
            onClick={() => setActiveTab('portfolio')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'portfolio' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:bg-white/5'}`}
          >
            <ImageIcon size={20} /> Portfólio
          </button>
        </nav>

        <button onClick={handleLogout} className="mt-auto flex items-center gap-4 px-6 py-4 text-slate-500 hover:text-red-400 font-black uppercase tracking-widest">
          <LogOut size={20} /> Sair
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 lg:p-12 bg-gradient-to-br from-slate-950 to-slate-900 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase">Gestão de <span className="text-amber-500 italic">{activeTab}</span></h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-2">Administre o conteúdo do seu site</p>
          </div>
          {activeTab !== 'leads' && (
            <button 
              onClick={() => { setEditingItem(null); setUploadedImageUrl(''); setIsModalOpen(true); }}
              className="bg-amber-500 text-slate-950 px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-amber-500/20 uppercase text-xs tracking-widest"
            >
              <Plus size={20} /> Adicionar {activeTab === 'services' ? 'Serviço' : 'Projeto'}
            </button>
          )}
        </header>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="bg-slate-900/30 rounded-[3rem] border border-white/5 overflow-hidden backdrop-blur-sm">
            {activeTab === 'leads' && (
              <table className="w-full text-left text-white">
                <thead className="bg-white/[0.02] text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <tr>
                    <th className="px-10 py-6">Cliente</th>
                    <th className="px-10 py-6">Serviço</th>
                    <th className="px-10 py-6">Status</th>
                    <th className="px-10 py-6 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data.leads.length > 0 ? (
                    data.leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-white/[0.03]">
                        <td className="px-10 py-8">
                          <p className="font-black">{lead.client_name}</p>
                          <p className="text-[10px] text-slate-500 uppercase">{lead.whatsapp}</p>
                        </td>
                        <td className="px-10 py-8 text-sm text-slate-300">{lead.service_type}</td>
                        <td className="px-10 py-8">
                          <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${lead.status === 'novo' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>{lead.status}</span>
                        </td>
                        <td className="px-10 py-8 text-right">
                           <button onClick={() => handleDelete('leads', lead.id)} className="p-2 text-slate-500 hover:text-red-500"><Trash2 size={18} /></button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-10 py-20 text-center text-slate-600 font-bold uppercase tracking-widest text-xs">
                        Nenhum lead encontrado ou erro na conexão com o banco.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

            {(activeTab === 'services' || activeTab === 'portfolio') && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
                {(activeTab === 'services' ? data.services : data.portfolio).map((item) => (
                  <div key={item.id} className="bg-slate-950/50 p-6 rounded-3xl border border-white/5 group flex flex-col h-full">
                    {activeTab === 'portfolio' && (
                      <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-white/5">
                        <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-[8px] font-black uppercase px-2 py-1 rounded-md">{item.category}</div>
                      </div>
                    )}
                    <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                    <p className="text-sm text-slate-500 mb-6 line-clamp-2 flex-grow">{item.description || item.category}</p>
                    <div className="flex justify-end gap-3 border-t border-white/5 pt-4">
                      <button 
                        onClick={() => { 
                          setEditingItem(item); 
                          setUploadedImageUrl(item.image_url || '');
                          setIsModalOpen(true); 
                        }}
                        className="p-3 bg-white/5 hover:bg-amber-500 hover:text-slate-950 rounded-xl transition-all"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(activeTab === 'services' ? 'services' : 'portfolio_items', item.id)}
                        className="p-3 bg-white/5 hover:bg-red-500 rounded-xl transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* CRUD Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-slate-900 border border-white/10 w-full max-w-xl rounded-[2.5rem] overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar">
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-slate-900 sticky top-0 z-10">
                <h2 className="text-xl font-black uppercase text-white">{editingItem ? 'Editar' : 'Novo'} {activeTab === 'services' ? 'Serviço' : 'Projeto'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white"><X size={24} /></button>
              </div>
              <form onSubmit={handleSave} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black uppercase text-slate-500 mb-2">Título do {activeTab === 'services' ? 'Serviço' : 'Projeto'}</label>
                    <input name="title" defaultValue={editingItem?.title} required className="w-full bg-slate-950 border border-white/5 rounded-2xl p-4 outline-none focus:border-amber-500/50 text-white" />
                  </div>
                  
                  {activeTab === 'portfolio' && (
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-black uppercase text-slate-500 mb-2">Categoria</label>
                      <input name="category" defaultValue={editingItem?.category} required placeholder="Ex: Cozinha, Sala, Dormitório" className="w-full bg-slate-950 border border-white/5 rounded-2xl p-4 outline-none focus:border-amber-500/50 text-white" />
                    </div>
                  )}
                </div>

                {activeTab === 'services' ? (
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-500 mb-2">Descrição Detalhada</label>
                    <textarea name="description" defaultValue={editingItem?.description} required rows={4} className="w-full bg-slate-950 border border-white/5 rounded-2xl p-4 outline-none focus:border-amber-500/50 text-white" />
                  </div>
                ) : (
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-500 mb-2">Foto do Projeto</label>
                    <ImageUpload 
                      onUploadSuccess={(url) => setUploadedImageUrl(url)}
                      defaultImageUrl={editingItem?.image_url}
                    />
                  </div>
                )}
                
                <button type="submit" className="w-full bg-amber-500 text-slate-950 py-5 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition-transform">
                  <Save size={18} /> Salvar Alterações
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
