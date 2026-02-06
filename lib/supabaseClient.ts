
import { createClient } from '@supabase/supabase-js';

// Credenciais extraídas da Anon Key fornecida: hzfpajnnyuweiavznubuz
const supabaseUrl = 'https://hzfpajnnyuweiavznubuz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6ZnBham55dXdlaWF2em51YnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwODkzNjQsImV4cCI6MjA4MzY2NTM2NH0.9ozd2uoGwqmPFsbGlI2PvcJkwz088wXlUyCWti96-8c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});
