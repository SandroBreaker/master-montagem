
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Hammer, ArrowRight, AlertTriangle, ShieldCheck } from 'lucide-react';

const AuthPage: React.FC = () => {
  // Credenciais Hardcoded como valor inicial
  const [email, setEmail] = useState('ale.gomessilva97@gmail.com');
  const [password, setPassword] = useState('Tobi@1313');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Tentamos o login real apenas para manter a sincronia se o servidor voltar
      const { data, error: authError } = await (supabase.auth as any).signInWithPassword({
        email,
        password,
      });

      // Se der certo, maravilha. Se der erro (como Failed to fetch), nós forçamos a entrada
      // pois o usuário pediu acesso hardcoded.
      if (!authError && data.user) {
        navigate('/admin');
      } else {
        console.warn("Entrando via modo hardcoded devido a erro de rede ou credenciais.");
        
        // Simula uma sessão salvando um usuário fake no localStorage
        localStorage.setItem('master_admin_mock_user', JSON.stringify({
          email: 'ale.gomessilva97@gmail.com',
          id: 'mock-admin-id',
          user_metadata: { full_name: 'Administrador' }
        }));
        
        // Redireciona para o admin
        navigate('/admin');
        // Recarrega para garantir que o Contexto do App.tsx pegue a nova "sessão" mock
        window.location.reload();
      }
    } catch (err: any) {
      // Caso de erro total de rede (Failed to Fetch)
      console.error("Erro de conexão capturado. Usando bypass.");
      localStorage.setItem('master_admin_mock_user', JSON.stringify({
        email: 'ale.gomessilva97@gmail.com',
        id: 'mock-admin-id'
      }));
      navigate('/admin');
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md">
        <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="bg-amber-500 p-4 rounded-2xl mb-6 shadow-xl shadow-amber-500/20">
              <Hammer size={32} className="text-slate-950" />
            </div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tighter italic">
              Master<span className="text-amber-500">Admin</span>
            </h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-2">Modo Hardcoded Ativo</p>
          </div>

          <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center gap-4">
             <ShieldCheck size={20} className="text-amber-500 shrink-0" />
             <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tight leading-tight">
               As credenciais foram inseridas automaticamente. Clique no botão abaixo para acessar o painel.
             </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2 ml-1">E-mail Administrativo</label>
              <input 
                type="email" 
                required
                className="w-full bg-slate-950 border border-white/5 rounded-2xl p-4 text-white placeholder:text-slate-800 focus:border-amber-500/50 outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2 ml-1">Senha de Acesso</label>
              <input 
                type="password" 
                required
                className="w-full bg-slate-950 border border-white/5 rounded-2xl p-4 text-white placeholder:text-slate-800 focus:border-amber-500/50 outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-amber-500 text-slate-950 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-amber-500/30"
            >
              {loading ? 'Acessando...' : 'Entrar no Painel'}
              <ArrowRight size={20} />
            </button>
          </form>
          
          <p className="mt-8 text-center text-slate-600 text-[10px] font-bold uppercase tracking-widest">
            Acesso administrativo master liberado.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
