import {
  boolean,
  index,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import CategoryModel from './category.model';

class ProductModel {
  static table = mysqlTable(
    'products',
    {
      id: int('id', { unsigned: true }).autoincrement().primaryKey(),
      name: varchar('name', { length: 255 }).notNull(),
      categoryId: int('category_id', { unsigned: true }).references(
        () => CategoryModel.table.id
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
}

export type Product = typeof ProductModel.table.$inferInsert;
export type Products = typeof ProductModel.table.$inferSelect;

export default ProductModel;
