
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
  
  // Verifica se há um usuário real ou um usuário "Mock" no localStorage
  const mockUser = localStorage.getItem('master_admin_mock_user');
  if (!user && !mockUser) return <Navigate to="/auth" replace />;
  
  return <>{children}</>;
};

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        // Tenta pegar a sessão real
        const { data: { session }, error } = await (supabase.auth as any).getSession();
        if (session) {
          setUser(session.user);
        } else {
          // Se não tiver sessão real, verifica se existe o bypass de hardcode
          const mockUser = localStorage.getItem('master_admin_mock_user');
          if (mockUser) setUser(JSON.parse(mockUser));
        }
      } catch (err) {
        console.warn("Aviso: Falha ao verificar sessão inicial. Usando modo de segurança.", err);
        const mockUser = localStorage.getItem('master_admin_mock_user');
        if (mockUser) setUser(JSON.parse(mockUser));
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: { subscription } } = (supabase.auth as any).onAuthStateChange((_event: any, session: any) => {
      if (session) {
        setUser(session.user);
      } else {
        const mockUser = localStorage.getItem('master_admin_mock_user');
        setUser(mockUser ? JSON.parse(mockUser) : null);
      }
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
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AuthContext.Provider>
  );
};

export default App;
