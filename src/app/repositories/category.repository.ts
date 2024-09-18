import { MySql2Database } from 'drizzle-orm/mysql2';
import logger from '@configs/logger';
import { categories } from '@models/category.model';

class CategoryRepository {
  constructor(private _db: MySql2Database<Record<string, never>>) {
    this.find = this.find.bind(this);
  }

  async find() {
    const result = await this._db.select().from(categories);

    const sql = this._db.select().from(categories).toSQL();

    logger.sql(`Query : ${sql.sql}`, { sql });
    logger.sql(`Params : ${sql.params}`, { sql });

    return result;
  }
}

export default CategoryRepository;
