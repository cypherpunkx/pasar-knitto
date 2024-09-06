import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, unique, serial, text, bigint, varchar, tinyint } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const migrations = mysqlTable("migrations", {
	id: serial("id").notNull(),
	hash: text("hash").notNull(),
	createdAt: bigint("created_at", { mode: "number" }),
},
(table) => {
	return {
		migrationsId: primaryKey({ columns: [table.id], name: "migrations_id"}),
		id: unique("id").on(table.id),
	}
});

export const users = mysqlTable("users", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	username: varchar("username", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	password: varchar("password", { length: 255 }).notNull(),
	status: tinyint("status").default(0),
	ipAddress: varchar("ip_address", { length: 255 }),
},
(table) => {
	return {
		usersId: primaryKey({ columns: [table.id], name: "users_id"}),
	}
});