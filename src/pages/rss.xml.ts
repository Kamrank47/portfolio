import type { APIRoute } from "astro";
import { posts, profile } from "../data/profile";

const esc = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const GET: APIRoute = ({ site }) => {
  const origin = site?.href.replace(/\/$/, "") ?? "https://kamranhashmi.pages.dev";
  const items = posts
    .map(
      (post) => `    <item>
      <title>${esc(post.title)}</title>
      <link>${esc(post.href)}</link>
      <guid>${esc(post.href)}</guid>
      <pubDate>${new Date(`${post.date} 1`).toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(profile.name)} · writing</title>
    <link>${origin}</link>
    <description>Notes on infrastructure, delivery and operations.</description>
    <language>en</language>
${items}
  </channel>
</rss>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
