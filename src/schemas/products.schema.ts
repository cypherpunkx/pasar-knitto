import { createInsertSchema } from 'drizzle-valibot';
import {
  boolean,
  minValue,
  nonEmpty,
  number,
  optional,
  picklist,
  pipe,
  string,
  transform,
} from 'valibot';
import ProductModel from '@models/products.model';

class ProductSchema {
  static CreateProductSchema = createInsertSchema(ProductModel.table, {
    name: pipe(string('Name must be string'), nonEmpty('Name is required')),
    categoryId: optional(
      pipe(
        string(),
        transform((input) => parseInt(input)),
        number('Category id must be number')
      )
    ),
    price: pipe(
      string(),
      transform((input) => parseInt(input)),
      number('Price must be number'),
      minValue(0, 'Price must be greater than 0')
    ),
    availability: optional(
      pipe(
        picklist(
          ['true', 'false'],
          'Availability harus salah satu dari true atau false'
        ),
        transform((input) => Boolean(input)),
        boolean('Availability must be boolean')
      )
    ),
    brand: optional(string('Brand must be string')),
    description: optional(string('Description must be string')),
    image: optional(string('Image must be string')),
  });

  static UpdateProductSchmea = createInsertSchema(ProductModel.table, {
    name: optional(
      pipe(string('Name must be string'), nonEmpty('Name is required'))
    ),
    categoryId: optional(
      pipe(
        string(),
        transform((input) => parseInt(input)),
        number('Category id must be number')
      )
    ),
    price: optional(
      pipe(
        string(),
        transform((input) => parseInt(input)),
        number('Price must be number'),
        minValue(0, 'Price must be greater than 0')
      )
    ),
    availability: optional(
      pipe(
        picklist(
          ['true', 'false'],
          'Availability harus salah satu dari true atau false'
        ),
        transform((input) => Boolean(input)),
        boolean('Availability must be boolean')
      )
    ),
    brand: optional(string('Brand must be string')),
    description: optional(string('Description must be string')),
    image: optional(string('Image must be string')),
  });
}

export default ProductSchema;
