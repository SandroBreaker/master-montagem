
-- ==========================================
-- 1. CONFIGURAÇÕES INICIAIS
-- ==========================================

-- Habilitar extensão para geração de UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 2. CRIAÇÃO DAS TABELAS
-- ==========================================

-- Tabela de Perfis (Vinculada ao Auth do Supabase)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role TEXT DEFAULT 'admin',
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Leads (Captura de contatos do site)
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_name TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  service_type TEXT,
  status TEXT DEFAULT 'novo' CHECK (status IN ('novo', 'contatado', 'convertido', 'arquivado')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Serviços (Conteúdo dinâmico da seção Serviços)
CREATE TABLE IF NOT EXISTS public.services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT DEFAULT 'Hammer', -- Referência aos ícones do Lucide
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Portfólio (Conteúdo dinâmico da galeria)
CREATE TABLE IF NOT EXISTS public.portfolio_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 3. SEGURANÇA (ROW LEVEL SECURITY)
-- ==========================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;

-- Políticas para Profiles
CREATE POLICY "Qualquer usuário autenticado pode ver perfis" ON public.profiles FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Usuários podem atualizar o próprio perfil" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Políticas para Leads
CREATE POLICY "Público pode enviar leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Apenas admins autenticados podem ver leads" ON public.leads FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Apenas admins autenticados podem editar leads" ON public.leads FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Apenas admins autenticados podem deletar leads" ON public.leads FOR DELETE USING (auth.role() = 'authenticated');

-- Políticas para Serviços
CREATE POLICY "Público pode ver serviços ativos" ON public.services FOR SELECT USING (is_active = true);
CREATE POLICY "Admins podem gerenciar serviços" ON public.services FOR ALL USING (auth.role() = 'authenticated');

-- Políticas para Portfólio
CREATE POLICY "Público pode ver portfólio" ON public.portfolio_items FOR SELECT USING (true);
CREATE POLICY "Admins podem gerenciar portfólio" ON public.portfolio_items FOR ALL USING (auth.role() = 'authenticated');

-- ==========================================
-- 4. AUTOMAÇÕES (FUNCTIONS & TRIGGERS)
-- ==========================================

-- Função para criar perfil automaticamente no SignUp
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para executar a função acima
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==========================================
-- 5. DADOS INICIAIS (SEED DATA)
-- ==========================================

-- Inserir Serviços Iniciais
INSERT INTO public.services (title, description, icon_name, order_index) VALUES
('Montagem de Dormitórios', 'Especialista em roupeiros, camas box, criados-mudos e painéis de cabeceira com alinhamento a laser.', 'Home', 1),
('Móveis de Escritório', 'Montagem técnica de mesas de reunião, estações de trabalho e arquivos deslizantes corporativos.', 'Briefcase', 2),
('Cozinhas Planejadas', 'Instalação precisa de armários aéreos, balcões e nichos com acabamento selado e ajustes finos.', 'Layout', 3),
('Home Theater & Painéis', 'Fixação segura em drywall ou alvenaria, com passagem oculta de cabos e nivelamento perfeito.', 'Tv', 4),
('Instalações Diversas', 'Colocação de prateleiras, quadros, suportes de TV e acessórios de banheiro ou cozinha.', 'Layers', 5),
('Desmontagem Técnica', 'Cuidado extremo na desmontagem para mudanças, com organização e marcação de ferragens.', 'Hammer', 6);

-- Inserir Itens de Portfólio Iniciais
INSERT INTO public.portfolio_items (title, category, image_url, order_index) VALUES
('Cozinha Contemporânea', 'Cozinha', 'https://images.unsplash.com/photo-1556911220-e15224bbafb0?auto=format&fit=crop&q=80&w=800', 1),
('Closet Inteligente', 'Dormitório', 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800', 2),
('Escritório Executivo', 'Corporativo', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800', 3),
('Painel Ripado Slim', 'Sala', 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80&w=800', 4);
