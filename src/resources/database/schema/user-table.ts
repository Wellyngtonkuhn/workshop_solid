import { uuid, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  phoneNumber: varchar("phone_number", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  preferredMarketingChannel: varchar("preferred_marketing_channel", { length: 255}).notNull().default("email"),
  status: varchar("status", { length: 50 }).notNull().default("PENDING")
});
