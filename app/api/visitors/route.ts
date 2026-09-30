import { count } from "drizzle-orm";
import { getDb } from "../../../db";
import { siteVisitors } from "../../../db/schema";

const COOKIE_NAME = "portfolio_visitor";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function readVisitorId(request: Request) {
  const value = request.headers.get("cookie")?.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]+)`))?.[1];
  return value && /^[a-zA-Z0-9-]{20,64}$/.test(value) ? value : null;
}

async function visitorCount() {
  const db = getDb();
  const [result] = await db.select({ total: count() }).from(siteVisitors);
  return result.total;
}

export async function GET() {
  try {
    return Response.json({ count: await visitorCount() });
  } catch {
    return Response.json({ error: "Visitor counter is temporarily unavailable." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  try {
    const existingVisitor = readVisitorId(request);
    const visitorId = existingVisitor ?? crypto.randomUUID();
    const db = getDb();

    if (!existingVisitor) {
      await db.insert(siteVisitors).values({ visitorId, firstSeenAt: new Date().toISOString() }).onConflictDoNothing();
    }

    const response = Response.json({ count: await visitorCount() });
    if (!existingVisitor) {
      response.headers.append("Set-Cookie", `${COOKIE_NAME}=${visitorId}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax; Secure; HttpOnly`);
    }
    return response;
  } catch {
    return Response.json({ error: "Visitor counter is temporarily unavailable." }, { status: 503 });
  }
}
