import {
  boolean,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

export const product = mysqlTable('products', {
  id: int('id', { unsigned: true }).autoincrement().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  category: varchar('category', { length: 255 }).default('other'),
  price: int('price', { unsigned: true }).notNull(),
  availability: boolean('availability').default(false),
  brand: varchar('brand', { length: 255 }).default('other'),
  description: text('description'),
  image: varchar('image', { length: 255 }).default('default.jpg'),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Product = typeof product.$inferInsert;
export type Products = typeof product.$inferSelect;

export default { product };
