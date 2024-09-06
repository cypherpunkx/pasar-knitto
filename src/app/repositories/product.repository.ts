import { MySql2Database } from 'drizzle-orm/mysql2';
// import { MySqlColumn } from 'drizzle-orm/mysql-core';
import { eq, like, max, min } from 'drizzle-orm';
import logger from '@configs/logger';
import model, { Product } from '@models/products.model';

class ProductRepository {
  constructor(private _db: MySql2Database<Record<string, never>>) {
    this.create = this.create.bind(this);
    this.find = this.find.bind(this);
    this.get = this.get.bind(this);
    this.getByFilename = this.getByFilename.bind(this);
    this.getRangePrice = this.getRangePrice.bind(this);
    this.update = this.update.bind(this);
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
    logger.sql(`Params : ${sql.params}`, { sql });

    return result;

    // const response = await fetch('https://dummyjson.com/products');

    // const json = await response.json();

    // return json;
  }

  async search(q: string) {
    const result = await this._db
      .select()
      .from(model.product)
      .where(like(model.product.name, `%${q}%`));

    const sql = this._db
      .select()
      .from(model.product)
      .where(like(model.product.name, `%${q}%`))
      .toSQL();

    logger.sql(`Query : ${sql.sql}`, { sql });

    return result;

    // const response = await fetch(
    //   `https://dummyjson.com/products/search?${searchParams}}`
    // );

    // const json = await response.json();

    // return json;
  }

  async get(id: number) {
    const [result] = await this._db
      .select()
      .from(model.product)
      .where(eq(model.product.id, id));

    const sql = this._db
      .select()
      .from(model.product)
      .where(eq(model.product.id, id))
      .toSQL();

    logger.sql(`Query : ${sql.sql}`, { sql });
    logger.sql(`Params : ${sql.params}`, { sql });

    return result;

    // const response = await fetch(`https://dummyjson.com/products/${id}`);

    // if (response.status === 404) {
    //   const json = await response.json();
    //   throw new NotFound((json as any).message);
    // }

    // const json = await response.json();

    // return json;
  }

  async getByFilename(filename: string) {
    const [result] = await this._db
      .select()
      .from(model.product)
      .where(eq(model.product.image, filename));

    const sql = this._db
      .select()
      .from(model.product)
      .where(eq(model.product.image, filename))
      .toSQL();

    logger.sql(`Query : ${sql.sql}`, { sql });
    logger.sql(`Params : ${sql.params}`, { sql });

    return result;

    // const response = await fetch(`https://dummyjson.com/products/${id}`);

    // if (response.status === 404) {
    //   const json = await response.json();
    //   throw new NotFound((json as any).message);
    // }

    // const json = await response.json();

    // return json;
  }

  async getRangePrice() {
    const [result] = await this._db
      .select({
        min: min(model.product.price),
        max: max(model.product.price),
      })
      .from(model.product);

    const sql = this._db
      .select({
        min: min(model.product.price),
        max: max(model.product.price),
      })
      .from(model.product)
      .toSQL();

    logger.sql(`Query : ${sql.sql}`, { sql });
    logger.sql(`Params : ${sql.params}`, { sql });

    return result;

    // const response = await fetch(`https://dummyjson.com/products/${id}`);

    // if (response.status === 404) {
    //   const json = await response.json();
    //   throw new NotFound((json as any).message);
    // }

    // const json = await response.json();

    // return json;
  }

  async update(id: number, payload: Partial<Product>) {
    const [result, field] = await this._db
      .update(model.product)
      .set(payload)
      .where(eq(model.product.id, id));

    const sql = this._db
      .update(model.product)
      .set(payload)
      .where(eq(model.product.id, id))
      .toSQL();

    logger.info(`Field : ${field || 'empty'}`);
    logger.sql(`Query : ${sql.sql}`, { sql });
    logger.sql(`Params : ${sql.params}`, { sql });

    return result;
  }
}

export default ProductRepository;
