import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const origin = site?.href.replace(/\/$/, "") ?? "https://kamranhashmi.pages.dev";
  const paths = ["/", "/resume", "/demo/copilot"];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${origin}${p}</loc><changefreq>monthly</changefreq></url>`).join("\n")}
</urlset>`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
