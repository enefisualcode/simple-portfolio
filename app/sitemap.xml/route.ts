import { headers } from "next/headers";

const paths = ["/", "/projects/finance-bot", "/projects/work-report-bot", "/projects/kabisat", "/projects/geprek-ajo"];

function siteUrl(host: string | null) {
  const safeHost = host?.replace(/[^a-zA-Z0-9.:-]/g, "") || "localhost";
  return `https://${safeHost}`;
}

export async function GET() {
  const baseUrl = siteUrl((await headers()).get("x-forwarded-host") ?? (await headers()).get("host"));
  const urls = paths.map((path) => `<url><loc>${baseUrl}${path}</loc><changefreq>monthly</changefreq><priority>${path === "/" ? "1.0" : "0.8"}</priority></url>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { "Content-Type": "application/xml" } });
}
