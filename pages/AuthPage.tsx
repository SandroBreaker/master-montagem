
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Hammer, ArrowRight } from 'lucide-react';

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Tenta realizar o login
      const { data, error: authError } = await (supabase.auth as any).signInWithPassword({
        email,
        password,
      });

      if (authError) {
        console.error("Erro detalhado do Supabase:", authError);
        
        // Mensagens mais amigáveis baseadas no erro real
        if (authError.message.includes('Email not confirmed')) {
          setError('Você precisa confirmar seu e-mail antes de acessar.');
        } else if (authError.message.includes('Invalid login credentials')) {
          setError('E-mail ou senha incorretos.');
        } else {
          setError(authError.message);
        }
      } else if (data.user) {
        navigate('/admin');
      }
    } catch (err: any) {
      console.error("Erro de conexão/rede:", err);
      setError('Erro de conexão com o servidor. Verifique se o projeto está ativo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-slate-900 p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="bg-amber-500 p-4 rounded-2xl mb-6 shadow-xl shadow-amber-500/20">
            <Hammer size={32} className="text-slate-950" />
          </div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tighter italic">
            Master<span className="text-amber-500">Admin</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-2">Painel de Controle</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2 ml-1">E-mail Administrativo</label>
            <input 
              type="email" 
              required
              placeholder="exemplo@master.com"
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
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-white/5 rounded-2xl p-4 text-white placeholder:text-slate-800 focus:border-amber-500/50 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-red-400 text-[10px] font-black text-center uppercase tracking-tighter leading-tight">{error}</p>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-amber-500 text-slate-950 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-amber-500/30 disabled:opacity-50"
          >
            {loading ? 'Validando...' : 'Acessar Painel'}
            <ArrowRight size={20} />
          </button>
        </form>
        
        <p className="mt-8 text-center text-slate-600 text-[10px] font-bold uppercase tracking-widest">
          Acesso restrito a profissionais autorizados.
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
