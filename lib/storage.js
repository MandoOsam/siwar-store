import { supabase, dbReady } from './supabaseClient';

export async function sget(key, fallback) {
  if (!dbReady) return fallback;
  try {
    const { data, error } = await supabase.from('siwar_data').select('value').eq('key', key).single();
    if (error) {
      if (error.code === 'PGRST116') return fallback;
      console.error(`[sget] key="${key}" code=${error.code} message=${error.message} details=${error.details}`);
      return fallback;
    }
    if (!data) return fallback;
    return data.value;
  } catch (e) {
    console.error(`[sget] key="${key}" exception:`, e.message || e);
    return fallback;
  }
}

export async function sset(key, value) {
  if (!dbReady) return { ok: false, reason: 'no-db' };
  try {
    const { error } = await supabase.from('siwar_data').upsert({ key, value }, { onConflict: 'key' });
    if (error) {
      console.error(`[sset] key="${key}" code=${error.code} message=${error.message} details=${error.details} hint=${error.hint}`);
      return { ok: false, reason: error.message };
    }
    return { ok: true };
  } catch (e) {
    console.error(`[sset] key="${key}" exception:`, e.message || e);
    return { ok: false, reason: e.message || 'unknown' };
  }
}

export async function fetchOrders() {
  if (!dbReady) return [];
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error(`[fetchOrders] code=${error.code} message=${error.message} details=${error.details}`);
      return [];
    }
    return data || [];
  } catch (e) {
    console.error('[fetchOrders] exception:', e.message || e);
    return [];
  }
}

export async function insertOrder(row) {
  try {
    const { data, error } = await supabase.from('orders').insert(row).select();
    if (error) {
      console.error('[insertOrder] Supabase error:', error);
      return { ok: false, error };
    }
    return { ok: true, data };
  } catch (e) {
    console.error('[insertOrder] exception:', e);
    return { ok: false, error: e };
  }
}

export async function updateOrderStatus(_id, _status) {
  return { ok: false, reason: 'no-status-column' };
}

export async function deleteOrder(id) {
  if (!dbReady) return { ok: false, reason: 'no-db' };
  try {
    const { error } = await supabase.from('orders').delete().eq('id', id);
    if (error) {
      console.error(`[deleteOrder] code=${error.code} message=${error.message} details=${error.details} hint=${error.hint}`);
      return { ok: false, reason: error.message };
    }
    return { ok: true };
  } catch (e) {
    console.error('[deleteOrder] exception:', e.message || e);
    return { ok: false, reason: e.message || 'unknown' };
  }
}
