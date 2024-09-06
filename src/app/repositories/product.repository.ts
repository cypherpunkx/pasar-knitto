import logger from '@configs/logger';
import model, { Product } from '@models/products.model';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { NotFound } from 'http-errors';

class ProductRepository {
  constructor(private _db: MySql2Database<Record<string, never>>) {
    this.create = this.create.bind(this);
    this.find = this.find.bind(this);
    this.get = this.get.bind(this);
    this.search = this.search.bind(this);
  }

  async create(payload: Product) {
    const [result, field] = await this._db
      .insert(model.product)
      .values(payload);

    const sql = this._db.insert(model.product).values(payload).toSQL();

    logger.info(`Field : ${field || 'empty'}`);
    logger.sql(`Query : ${sql.sql}`, { sql });
    logger.sql(`Params : ${sql.params}`, { sql });

    return result;
  }

  async find() {
    const result = await this._db.select().from(model.product);

    const sql = this._db.select().from(model.product).toSQL();

    logger.sql(`Query : ${sql.sql}`, { sql });

    return result;

    // const response = await fetch('https://dummyjson.com/products');

    // const json = await response.json();

    // return json;
  }

  async search(searchParams?: URLSearchParams) {
    // const result = await this._db.select().from(model.product);

    // const sql = this._db.select().from(model.product).toSQL();

    // logger.sql(`Query : ${sql.sql}`, { sql });

    const response = await fetch(
      `https://dummyjson.com/products/search?${searchParams!.toString()}`
    );

    const json = await response.json();

    return json;
  }

  async get(id: number) {
    // const result = await this._db.select().from(model.product);

    // const sql = this._db.select().from(model.product).toSQL();

    // logger.sql(`Query : ${sql.sql}`, { sql });

    const response = await fetch(`https://dummyjson.com/products/${id}`);

    if (response.status === 404) {
      const json = await response.json();
      throw new NotFound((json as any).message);
    }

    const json = await response.json();

    return json;
  }
}

export default ProductRepository;
