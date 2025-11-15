export async function onRequest({ env, params }) {
  const id = params.id;
  if (!id) return new Response('Missing id', { status: 400 });

  const data = await env.SHORTEN.get(id);
  if (!data) return new Response('Not found', { status: 404 });

  // inject directly into URL hash, no double encoding
  const html = `<!doctype html>
<meta charset="utf-8">
<title>Loading…</title>
<script>
  location.replace('/#data=${data}');
</script>`;

  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}