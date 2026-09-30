import { sqliteTable, text } from "drizzle-orm/sqlite-core";

/** An anonymous browser identifier prevents repeat-refresh counting. */
export const siteVisitors = sqliteTable("site_visitors", {
  visitorId: text("visitor_id").primaryKey(),
  firstSeenAt: text("first_seen_at").notNull(),
});
