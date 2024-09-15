import { MySql2Database } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm';
import logger from '@configs/logger';
import { User, users } from '@models/user.model';
import { roles } from '@models/role.model';
import { profiles } from '@models/profile.model';

class UserRepository {
  constructor(private _db: MySql2Database<Record<string, never>>) {
    this.create = this.create.bind(this);
    this.find = this.find.bind(this);
    this.get = this.get.bind(this);
    this.editPassword = this.editPassword.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(payload: User) {
    await this._db.transaction(async (tx) => {
      logger.sql('Start transaction');
      const [{ insertId: userId }, field] = await tx
        .insert(users)
        .values(payload);

      const insertUserSql = tx.insert(users).values(payload).toSQL();

      logger.info(`Field : ${field || 'empty'}`);
      logger.sql(`Query : ${insertUserSql.sql}`, { insertUserSql });
      logger.sql(`Params : ${insertUserSql.params}`, { insertUserSql });

      await tx.insert(profiles).values({ userId });

      const insertProfileSql = tx.insert(profiles).values({ userId }).toSQL();

      logger.info(`Field : ${field || 'empty'}`);
      logger.sql(`Query : ${insertProfileSql.sql}`, { insertProfileSql });
      logger.sql(`Params : ${insertProfileSql.params}`, { insertProfileSql });

      logger.sql('Commit transaction');
    });
  }

  async find() {
    const result = await this._db
      .select()
      .from(users)
      .leftJoin(roles, eq(users.roleId, roles.id));

    const sql = this._db.select().from(users).toSQL();

    logger.sql(`Query : ${sql.sql}`, { sql });
    logger.sql(`Params : ${sql.params}`, { sql });

    return result;
  }

  async get(id: number) {
    const [result] = await this._db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .leftJoin(roles, eq(users.roleId, roles.id));

    const sql = this._db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .leftJoin(roles, eq(users.roleId, roles.id))
      .toSQL();

    logger.sql(`Query : ${sql.sql}`, { sql });
    logger.sql(`Params : ${sql.params}`, { sql });

    return result;
  }

  async getByEmail(email: string) {
    const [result] = await this._db
      .select()
      .from(users)
      .where(eq(users.email, email));

    const sql = this._db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .toSQL();

    logger.sql(`Query : ${sql.sql}`, { sql });
    logger.sql(`Params : ${sql.params}`, { sql });

    return result;
  }

  async update(id: number, payload: Partial<User>) {
    const [result, field] = await this._db
      .update(users)
      .set(payload)
      .where(eq(users.id, id));

    const sql = this._db
      .update(users)
      .set(payload)
      .where(eq(users.id, id))
      .toSQL();

    logger.info(`Field : ${field || 'empty'}`);
    logger.sql(`Query : ${sql.sql}`, { sql });
    logger.sql(`Params : ${sql.params}`, { sql });

    return result;
  }

  async editPassword(id: number, newPassword: string) {
    const [result, field] = await this._db
      .update(users)
      .set({ password: newPassword })
      .where(eq(users.id, id));

    const sql = this._db
      .update(users)
      .set({ password: newPassword })
      .where(eq(users.id, id))
      .toSQL();

    logger.info(`Field : ${field || 'empty'}`);
    logger.sql(`Query : ${sql.sql}`, { sql });
    logger.sql(`Params : ${sql.params}`, { sql });

    return result;
  }

  async delete(id: number) {
    const [result, field] = await this._db
      .delete(users)
      .where(eq(users.id, id));

    const sql = this._db.delete(users).where(eq(users.id, id)).toSQL();

    logger.info(`Field : ${field || 'empty'}`);
    logger.sql(`Query : ${sql.sql}`, { sql });
    logger.sql(`Params : ${sql.params}`, { sql });

    return result;
  }
}

export default UserRepository;
