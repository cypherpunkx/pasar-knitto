import {
  boolean,
  index,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { category } from './category.model';

export const product = mysqlTable(
  'products',
  {
    id: int('id', { unsigned: true }).autoincrement().primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    categoryId: int('category_id', { unsigned: true }).references(
      () => category.id
    ),
    price: int('price', { unsigned: true }).notNull(),
    availability: boolean('availability').default(false),
    brand: varchar('brand', { length: 255 }).default('other'),
    description: text('description'),
    image: varchar('image', { length: 255 }).default('default.jpg'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').onUpdateNow(),
  },
  (table) => {
    return {
      nameIdx: index('name_idx').on(table.name),
      priceIdx: index('price_idx').on(table.price),
      brandIdx: index('brand_idx').on(table.brand),
    };
  }
);

export type Product = typeof product.$inferInsert;
export type Products = typeof product.$inferSelect;

export default { product };
