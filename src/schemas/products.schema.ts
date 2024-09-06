import model from '@models/products.model';
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

class ProductSchema {
  static CreateProductSchema = createInsertSchema(model.product, {
    name: pipe(string('Name must be string'), nonEmpty('Name is required')),
    category: optional(string('Category must be string')),
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
}

export default ProductSchema;
