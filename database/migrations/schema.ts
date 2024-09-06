import {
  mysqlTable,
  primaryKey,
  varchar,
  tinyint,
  int,
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable(
  'users',
  {
    id: int('id', { unsigned: true }).autoincrement().notNull(),
    username: varchar('username', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    status: tinyint('status').default(0),
    ipAddress: varchar('ip_address', { length: 255 }),
  },
  (table) => {
    return {
      usersId: primaryKey({ columns: [table.id], name: 'users_id' }),
    };
  }
);
