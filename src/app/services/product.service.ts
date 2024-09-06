import { Product } from '@models/products.model';
import ProductRepository from '@repositories/product.repository';
import Validator from '@utils/validator';
import ProductSchema from '@schemas/products.schema';

class ProductService {
  constructor(private _repository: ProductRepository) {
    this.createProduct = this.createProduct.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.searchByName = this.searchByName.bind(this);
  }

  async createProduct(payload: Product) {
    payload = Validator.validate(ProductSchema.CreateProductSchema, payload);

    const result = await this._repository.create(payload);

    return result;
  }

  async getAll() {
    const result = await this._repository.find();

    return result;
  }

  async getById(id: number) {
    const result = await this._repository.get(id);

    return result;
  }

  async searchByName(query: { q: string }) {
    const searchParams = new URLSearchParams(query);
    const result = await this._repository.search(searchParams);

    return result;
  }
}

export default ProductService;
