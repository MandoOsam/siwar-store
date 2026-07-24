import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('[supabaseClient] URL:', url);

export const dbReady = Boolean(url && key);

export const supabase = dbReady ? createClient(url, key) : null;
