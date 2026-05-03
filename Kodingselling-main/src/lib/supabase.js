const url = import.meta.env.NEXT_PUBLIC_SUPABASE_URL ?? import.meta.env.VITE_SUPABASE_URL ?? '';
const publishableKey =
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  '';

export const supabaseConfig = {
  url,
  publishableKey,
  adminUser: import.meta.env.VITE_ADMIN ?? '',
  adminPass: import.meta.env.VITE_PASS ?? ''
};

const request = async (table, method, { body, query } = {}) => {
  if (!url || !publishableKey) {
    return { data: null, error: new Error('Missing Supabase configuration') };
  }

  const queryString = query ? `?${new URLSearchParams(query).toString()}` : '';
  const res = await fetch(`${url}/rest/v1/${table}${queryString}`, {
    method,
    headers: {
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation'
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) return { data: null, error: json ?? new Error('Supabase request failed') };
  return { data: json, error: null };
};

export const supabase = {
  insert: (table, row) => request(table, 'POST', { body: row }),
  list: (table, { limit = 20 } = {}) =>
    request(table, 'GET', {
      query: { select: '*', order: 'created_at.desc', limit: String(limit) }
    })
};
