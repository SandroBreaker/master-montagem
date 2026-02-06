
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';

// Layouts e Páginas
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';
import AuthPage from './pages/AuthPage';

// Contexto de Autenticação
const AuthContext = createContext<{ user: any; loading: boolean }>({ user: null, loading: true });

export const useAuth = () => useContext(AuthContext);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-950 text-amber-500 font-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="tracking-widest uppercase text-xs">Carregando Sessão...</p>
        </div>
      </div>
    );
  }
  
  if (!user) return <Navigate to="/auth" replace />;
  return <>{children}</>;
};

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        // Fix: Use 'as any' to bypass missing 'getSession' property error in current type definitions
        const { data: { session }, error } = await (supabase.auth as any).getSession();
        if (error) throw error;
        setUser(session?.user ?? null);
      } catch (err) {
        console.warn("Aviso: Falha ao verificar sessão inicial. Verifique as chaves do Supabase.", err);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Fix: Use 'as any' to bypass missing 'onAuthStateChange' property error in current type definitions
    const { data: { subscription } } = (supabase.auth as any).onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      <HashRouter>
        <Routes>
          {/* Rota Raiz */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Autenticação */}
          <Route path="/auth" element={<AuthPage />} />
          
          {/* Dashboard Protegido */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch-all: Redireciona qualquer rota inexistente para a Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AuthContext.Provider>
  );
};

export default App;