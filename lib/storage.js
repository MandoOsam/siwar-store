import { supabase, dbReady } from './supabaseClient';

// جدول واحد بسيط اسمه siwar_data فيه عمودين: key (نص) و value (jsonb)
// شغّلي السكريبت ده مرة واحدة في SQL Editor بتاع Supabase:
//
// create table siwar_data (
//   key text primary key,
//   value jsonb
// );
// alter table siwar_data enable row level security;
// create policy "public access" on siwar_data for all using (true) with check (true);

export async function sget(key, fallback) {
  if (!dbReady) return fallback;
  try {
    const { data, error } = await supabase.from('siwar_data').select('value').eq('key', key).single();
    if (error || !data) return fallback;
    return data.value;
  } catch (e) {
    console.error('read failed', e);
    return fallback;
  }
}

export async function sset(key, value) {
  if (!dbReady) return { ok: false, reason: 'no-db' };
  try {
    const { error } = await supabase.from('siwar_data').upsert({ key, value });
    if (error) throw error;
    return { ok: true };
  } catch (e) {
    console.error('save failed', e);
    return { ok: false, reason: 'error' };
  }
}
