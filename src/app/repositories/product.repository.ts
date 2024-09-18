import { MySql2Database } from 'drizzle-orm/mysql2';
import { between, eq, like, max, min } from 'drizzle-orm';
import logger from '@configs/logger';
import CategoryModel, { categories } from '@models/category.model';
import ProductModel, { Product, products } from '@models/products.model';

class ProductRepository {
  constructor(private _db: MySql2Database<Record<string, never>>) {
    this.create = this.create.bind(this);
    this.find = this.find.bind(this);
    this.get = this.get.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.search = this.search.bind(this);
    this.getByFilename = this.getByFilename.bind(this);
    this.getRangePrice = this.getRangePrice.bind(this);
  }

  async create(payload: Product) {
    const [result, field] = await this._db
      .insert(ProductModel.table)
      .values(payload);

    const sql = this._db.insert(ProductModel.table).values(payload).toSQL();

    logger.info(`Field : ${field || 'empty'}`);
    logger.sql(`Query : ${sql.sql}`, { sql });
    logger.sql(`Params : ${sql.params}`, { sql });

    return result;
  }

  async find(range: number) {
    let result = await this._db
      .select({
        id: products.id,
        name: products.name,
        category: {
          id: categories.id,
          name: categories.name,
        },
        price: products.price,
        availability: products.availability,
        brand: products.brand,
        description: products.description,
        image: products.image,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
      })
      .from(ProductModel.table)
      .leftJoin(
        CategoryModel.table,
        eq(ProductModel.table.categoryId, CategoryModel.table.id)
      );

    let sql = this._db
      .select({
        id: products.id,
        name: products.name,
        category: {
          id: categories.id,
          name: categories.name,
        },
        price: products.price,
        availability: products.availability,
        brand: products.brand,
        description: products.description,
        image: products.image,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
      })
      .from(ProductModel.table)
      .leftJoin(
        CategoryModel.table,
        eq(ProductModel.table.categoryId, CategoryModel.table.id)
      )
      .toSQL();

    if (range) {
      const { min } = await this.getRangePrice();
      result = await this._db
        .select({
          id: products.id,
          name: products.name,
          category: {
            id: categories.id,
            name: categories.name,
          },
          price: products.price,
          availability: products.availability,
          brand: products.brand,
          description: products.description,
          image: products.image,
          createdAt: products.createdAt,
          updatedAt: products.updatedAt,
        })
        .from(ProductModel.table)
        .leftJoin(
          CategoryModel.table,
          eq(ProductModel.table.categoryId, CategoryModel.table.id)
        )
        .where(between(ProductModel.table.price, min!, range));

      sql = this._db
        .select({
          id: products.id,
          name: products.name,
          category: {
            id: categories.id,
            name: categories.name,
          },
          price: products.price,
          availability: products.availability,
          brand: products.brand,
          description: products.description,
          image: products.image,
          createdAt: products.createdAt,
          updatedAt: products.updatedAt,
        })
        .from(ProductModel.table)
        .leftJoin(
          CategoryModel.table,
          eq(ProductModel.table.categoryId, CategoryModel.table.id)
        )
        .where(between(ProductModel.table.price, min!, range))
        .toSQL();
    }

    logger.sql(`Query : ${sql.sql}`, { sql });
    logger.sql(`Params : ${sql.params}`, { sql });

    return result;
  }

  async search(q: string) {
    const result = await this._db
      .select({
        id: products.id,
        name: products.name,
        category: {
          id: categories.id,
          name: categories.name,
        },
        price: products.price,
        availability: products.availability,
        brand: products.brand,
        description: products.description,
        image: products.image,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
      })
      .from(ProductModel.table)
      .where(like(ProductModel.table.name, `%${q}%`));

    const sql = this._db
      .select({
        id: products.id,
        name: products.name,
        category: {
          id: categories.id,
          name: categories.name,
        },
        price: products.price,
        availability: products.availability,
        brand: products.brand,
        description: products.description,
        image: products.image,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
      })
      .from(ProductModel.table)
      .where(like(ProductModel.table.name, `%${q}%`))
      .toSQL();

    logger.sql(`Query : ${sql.sql}`, { sql });

    return result;
  }

  async get(id: number) {
    const [result] = await this._db
      .select({
        id: products.id,
        name: products.name,
        category: {
          id: categories.id,
          name: categories.name,
        },
        price: products.price,
        availability: products.availability,
        brand: products.brand,
        description: products.description,
        image: products.image,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
      })
      .from(ProductModel.table)
      .where(eq(ProductModel.table.id, id))
      .leftJoin(
        CategoryModel.table,
        eq(ProductModel.table.categoryId, CategoryModel.table.id)
      );

    const sql = this._db
      .select({
        id: products.id,
        name: products.name,
        category: {
          id: categories.id,
          name: categories.name,
        },
        price: products.price,
        availability: products.availability,
        brand: products.brand,
        description: products.description,
        image: products.image,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
      })
      .from(ProductModel.table)
      .where(eq(ProductModel.table.id, id))
      .innerJoin(
        CategoryModel.table,
        eq(ProductModel.table.categoryId, CategoryModel.table.id)
      )
      .toSQL();

    logger.sql(`Query : ${sql.sql}`, { sql });
    logger.sql(`Params : ${sql.params}`, { sql });

    return result;
  }

  async getByFilename(filename: string) {
    const [result] = await this._db
      .select()
      .from(ProductModel.table)
      .where(eq(ProductModel.table.image, filename));

    const sql = this._db
      .select()
      .from(ProductModel.table)
      .where(eq(ProductModel.table.image, filename))
      .toSQL();

    logger.sql(`Query : ${sql.sql}`, { sql });
    logger.sql(`Params : ${sql.params}`, { sql });

    return result;
  }

  async getRangePrice() {
    const [result] = await this._db
      .select({
        min: min(ProductModel.table.price),
        max: max(ProductModel.table.price),
      })
      .from(ProductModel.table);

    const sql = this._db
      .select({
        min: min(ProductModel.table.price),
        max: max(ProductModel.table.price),
      })
      .from(ProductModel.table)
      .toSQL();

    logger.sql(`Query : ${sql.sql}`, { sql });
    logger.sql(`Params : ${sql.params}`, { sql });

    return result;
  }

  async update(id: number, payload: Partial<Product>) {
    const [result, field] = await this._db
      .update(ProductModel.table)
      .set(payload)
      .where(eq(ProductModel.table.id, id));

    const sql = this._db
      .update(ProductModel.table)
      .set(payload)
      .where(eq(ProductModel.table.id, id))
      .toSQL();

    logger.info(`Field : ${field || 'empty'}`);
    logger.sql(`Query : ${sql.sql}`, { sql });
    logger.sql(`Params : ${sql.params}`, { sql });

    return result;
  }

  async delete(id: number) {
    const [result, field] = await this._db
      .delete(ProductModel.table)
      .where(eq(ProductModel.table.id, id));

    const sql = this._db
      .delete(ProductModel.table)
      .where(eq(ProductModel.table.id, id))
      .toSQL();

    logger.info(`Field : ${field || 'empty'}`);
    logger.sql(`Query : ${sql.sql}`, { sql });
    logger.sql(`Params : ${sql.params}`, { sql });

    return result;
  }
}

export default ProductRepository;
