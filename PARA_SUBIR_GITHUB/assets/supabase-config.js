// Configuração pública do Supabase — Feira do Livro de Santa Maria
// A chave publishable é pública por design (só permite o que a RLS libera).
window.FDL_SUPABASE_URL = 'https://kqblnfkynhfvaztnpujw.supabase.co';
window.FDL_SUPABASE_KEY = 'sb_publishable_hsjMqk4-9a7gDp8zxhQNLg_M7sXAm1U';

// Cria o client (se a biblioteca do CDN tiver carregado)
window.fdl = (window.supabase && window.supabase.createClient)
  ? window.supabase.createClient(window.FDL_SUPABASE_URL, window.FDL_SUPABASE_KEY)
  : null;
if (!window.fdl) console.warn('Supabase não carregou (sem internet?). O site funciona com dados de exemplo.');
