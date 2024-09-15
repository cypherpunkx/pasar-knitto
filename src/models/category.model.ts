import {
  int,
  mysqlTable,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core';

class CategoryModel {
  static table = mysqlTable(
    'categories',
    {
      id: int('id', { unsigned: true }).autoincrement().primaryKey(),
      name: varchar('name', { length: 255 }).notNull(),
      createdAt: timestamp('created_at').defaultNow(),
    },
    (table) => {
      return {
        nameIdx: uniqueIndex('name_idx').on(table.name),
      };
    }
  );
}

export const categories = CategoryModel.table;
export type Category = typeof CategoryModel.table.$inferInsert;
export type Categories = typeof CategoryModel.table.$inferSelect;

export default CategoryModel;
