import { headers } from "next/headers";

export async function GET() {
  const requestHeaders = await headers();
  const host = (requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost").replace(/[^a-zA-Z0-9.:-]/g, "");
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: https://${host}/sitemap.xml\n`, { headers: { "Content-Type": "text/plain" } });
}
