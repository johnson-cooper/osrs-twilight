export async function onRequest({ request, env }) {
  if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  let body;
  try { body = await request.json(); } 
  catch { return new Response('Invalid JSON', { status: 400 }); }

  const { data } = body;
  if (!data) return new Response('Missing data', { status: 400 });

  const id = Math.random().toString(36).slice(2, 9);
  try {
    await env.SHORTEN.put(id, data, { expirationTtl: 60 * 60 * 24 * 14 }); // 14 days
  } catch (err) {
    console.error('KV put failed', err);
    return new Response('Failed to save', { status: 500 });
  }

  return new Response(JSON.stringify({ id }), { headers: { 'Content-Type': 'application/json' } });
}