export async function onRequestGet({ params, env }) {
  const key = params.key;
  const longUrl = await env.SHORTEN.get(key);

  if (!longUrl) return new Response('Not found', { status: 404 });

  return Response.redirect(longUrl, 301);
}