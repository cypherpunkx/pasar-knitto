import { MySql2Database } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm';
import logger from '@configs/logger';
import ProfileModel, { Profile, profiles } from '@models/profile.model';
import { users } from '@models/user.model';

class ProfileRepository {
  constructor(private _db: MySql2Database<Record<string, never>>) {
    this.update = this.update.bind(this);
    this.get = this.get.bind(this);
  }

  async get(id: number) {
    const [result] = await this._db
      .select({
        username: profiles.username,
        email: users.email,
        fullname: profiles.fullname,
        phoneNumber: profiles.phoneNumber,
        birthdate: profiles.birthdate,
        address: profiles.address,
        createdAt: profiles.createdAt,
        updatedAt: profiles.updatedAt,
      })
      .from(profiles)
      .where(eq(profiles.userId, id))
      .innerJoin(users, eq(users.id, profiles.userId));

    const sql = this._db
      .select({
        username: profiles.username,
        email: users.email,
        fullname: profiles.fullname,
        phoneNumber: profiles.phoneNumber,
        birthdate: profiles.birthdate,
        address: profiles.address,
        createdAt: profiles.createdAt,
        updatedAt: profiles.updatedAt,
      })
      .from(profiles)
      .where(eq(profiles.userId, id))
      .innerJoin(users, eq(users.id, profiles.userId))
      .toSQL();

    logger.sql(`Query : ${sql.sql}`, { sql });
    logger.sql(`Params : ${sql.params}`, { sql });

    return result;
  }

  async update(id: number, payload: Partial<Profile>) {
    const [result, field] = await this._db
      .update(ProfileModel.table)
      .set(payload)
      .where(eq(ProfileModel.table.id, id));

    const sql = this._db
      .update(ProfileModel.table)
      .set(payload)
      .where(eq(ProfileModel.table.id, id))
      .toSQL();

    logger.info(`Field : ${field || 'empty'}`);
    logger.sql(`Query : ${sql.sql}`, { sql });
    logger.sql(`Params : ${sql.params}`, { sql });

    return result;
  }
}

export default ProfileRepository;
