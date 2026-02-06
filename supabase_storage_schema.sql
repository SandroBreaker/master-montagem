
-- ==========================================
-- CONFIGURAÇÃO DO SUPABASE STORAGE
-- ==========================================

-- 1. Criar o bucket para o Portfólio (se não existir)
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Habilitar RLS para o bucket (já habilitado por padrão em storage.objects)

-- 3. Política: Acesso Público para Visualização
-- Permite que qualquer visitante do site veja as imagens do portfólio
CREATE POLICY "Acesso Público para Visualização"
ON storage.objects FOR SELECT
USING ( bucket_id = 'portfolio' );

-- 4. Política: Acesso Restrito para Upload (Apenas Autenticados)
-- Apenas o administrador logado pode subir novas imagens
CREATE POLICY "Upload Restrito para Admin"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'portfolio' 
  AND auth.role() = 'authenticated'
);

-- 5. Política: Acesso Restrito para Edição (Apenas Autenticados)
CREATE POLICY "Edição Restrita para Admin"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'portfolio' 
  AND auth.role() = 'authenticated'
);

-- 6. Política: Acesso Restrito para Exclusão (Apenas Autenticados)
CREATE POLICY "Exclusão Restrita para Admin"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'portfolio' 
  AND auth.role() = 'authenticated'
);
