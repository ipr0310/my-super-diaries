import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// Diaries
export const diaries = sqliteTable("diaries", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  timestamp: integer("timestamp").notNull(),
});

export type Diary = typeof diaries.$inferSelect;
export type InsertDiary = typeof diaries.$inferInsert;

// Secrets
export const secrets = sqliteTable("secrets", {
  id: text("id").primaryKey(),
  key: text("key").notNull(),
});

export type Secret = typeof secrets.$inferSelect;
export type InsertSecret = typeof secrets.$inferInsert;
