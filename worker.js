export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // --- Create new shareable plan ---
    if (url.pathname === "/api/save" && request.method === "POST") {
      const body = await request.json();
      const id = crypto.randomUUID().slice(0, 8);
      await env.PLANNER_KV.put(id, JSON.stringify(body));
      return new Response(JSON.stringify({ id }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // --- Load existing plan ---
    if (url.pathname.startsWith("/api/load/")) {
      const id = url.pathname.split("/").pop();
      const data = await env.PLANNER_KV.get(id);
      if (!data)
        return new Response("Not found", { status: 404 });
      return new Response(data, { headers: { "Content-Type": "application/json" } });
    }

    return new Response("OSRS Planner API running", { status: 200 });
  },
};