import generateDefaultUsername from '@utils/generateDefaultUsername';
import {
  mysqlTable,
  int,
  uniqueIndex,
  varchar,
  timestamp,
  date,
} from 'drizzle-orm/mysql-core';
import UserModel from './user.model';
import { relations } from 'drizzle-orm';

class ProfileModel {
  static table = mysqlTable(
    'profiles',
    {
      id: int('id', { unsigned: true }).autoincrement().primaryKey(),
      username: varchar('username', { length: 255 })
        .unique()
        .$defaultFn(() => generateDefaultUsername()),
      fullname: varchar('fullname', { length: 255 }),
      phoneNumber: varchar('phone_number', { length: 255 }).unique(),
      birthdate: date('birthdate', { mode: 'string' }),
      address: varchar('address', { length: 255 }),
      image: varchar('image', { length: 255 }).default('default-profile.png'),
      userId: int('user_id', { unsigned: true })
        .notNull()
        .references(() => UserModel.table.id),
      createdAt: timestamp('created_at').defaultNow(),
      updatedAt: timestamp('updated_at').onUpdateNow(),
    },
    (table) => {
      return {
        usernameIdx: uniqueIndex('username_unique_idx').on(table.username),
        userIdIdx: uniqueIndex('user_id_idx').on(table.userId),
      };
    }
  );
}

export const profileInfoRelations = relations(
  ProfileModel.table,
  ({ one }) => ({
    user: one(UserModel.table, {
      fields: [ProfileModel.table.userId],
      references: [UserModel.table.id],
    }),
  })
);

export const profiles = ProfileModel.table;
export type Profile = typeof ProfileModel.table.$inferInsert;
export type Profiles = typeof ProfileModel.table.$inferSelect;

export default ProfileModel;
