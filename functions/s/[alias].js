// functions/s/[alias].js
export default {
  async fetch(request, env, ctx) {
    if (request.method !== 'GET') return new Response('Method Not Allowed', { status: 405 });
    const url = new URL(request.url);
    const alias = url.pathname.split('/').pop();
    const data = await env.SHORTEN.get(alias);
    if (!data) return new Response('Not found', { status: 404 });

    // redirect back to app with hash containing data
    const appUrl = `${url.origin}/#data=${data}`;
    return Response.redirect(appUrl, 302);
  }
}