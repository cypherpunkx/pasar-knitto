import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const category = mysqlTable('categories', {
  id: int('id', { unsigned: true }).autoincrement().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Category = typeof category.$inferInsert;
export type Categories = typeof category.$inferSelect;

export default { category: category };
