import {
  int,
  mysqlTable,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core';

class RoleModel {
  static table = mysqlTable(
    'roles',
    {
      id: int('id', { unsigned: true }).autoincrement().primaryKey(),
      name: varchar('name', { length: 255 }).unique().notNull(),
      createdAt: timestamp('created_at').defaultNow(),
      updatedAt: timestamp('updated_at').onUpdateNow(),
    },
    (table) => {
      return {
        nameIdx: uniqueIndex('name_unique_idx').on(table.name),
      };
    }
  );
}

export const roles = RoleModel.table;
export type Role = typeof RoleModel.table.$inferInsert;
export type Roles = typeof RoleModel.table.$inferSelect;

export default RoleModel;
