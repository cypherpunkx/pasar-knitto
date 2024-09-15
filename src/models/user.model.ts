import {
  mysqlTable,
  int,
  uniqueIndex,
  varchar,
  timestamp,
  boolean,
} from 'drizzle-orm/mysql-core';
import RoleModel from './role.model';
import ProfileModel from './profile.model';
import { relations } from 'drizzle-orm';

class UserModel {
  static table = mysqlTable(
    'users',
    {
      id: int('id', { unsigned: true }).autoincrement().primaryKey(),
      email: varchar('email', { length: 255 }).unique().notNull(),
      password: varchar('password', { length: 255 }).notNull(),
      roleId: int('role_id', { unsigned: true })
        .references(() => RoleModel.table.id)
        .default(1),
      is_active: boolean('is_active').default(true),
      createdAt: timestamp('created_at').defaultNow(),
      updatedAt: timestamp('updated_at').onUpdateNow(),
    },
    (table) => {
      return {
        emailIdx: uniqueIndex('email_unique_idx').on(table.email),
        userRoleIdx: uniqueIndex('user_role_unique_idx').on(
          table.email,
          table.roleId
        ),
      };
    }
  );
}

export const usersRelations = relations(UserModel.table, ({ one }) => ({
  profileInfo: one(ProfileModel.table),
}));

export const users = UserModel.table;
export type User = typeof UserModel.table.$inferInsert;
export type Users = typeof UserModel.table.$inferSelect;

export default UserModel;
