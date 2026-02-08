import { createClient } from '@supabase/supabase-js';

// Prioriza variáveis de ambiente (.env / Vercel Settings)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hzfpajnnyuweiavznubuz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
