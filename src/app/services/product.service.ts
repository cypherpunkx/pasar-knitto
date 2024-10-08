import fs from 'fs/promises';
import path from 'path';
import { NotFound } from 'http-errors';
import { Product } from '@models/products.model';
import Validator from '@utils/validator';
import ProductSchema from '@schemas/product.schema';
import logger from '@configs/logger';
import ProductRepository from '@repositories/product.repository';
import CategoryRepository from '@app/repositories/category.repository';

class ProductService {
  constructor(
    private _productRepository: ProductRepository,
    private _categoryRepository: CategoryRepository
  ) {
    this.createProduct = this.createProduct.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.updateProductById = this.updateProductById.bind(this);
    this.deleteProductById = this.deleteProductById.bind(this);
    this.searchByName = this.searchByName.bind(this);
    this.getFileMetadata = this.getFileMetadata.bind(this);
    this.getFileMetadataById = this.getFileMetadataById.bind(this);
    this.getRangeProductPrice = this.getRangeProductPrice.bind(this);
    this.getAllCategories = this.getAllCategories.bind(this);
  }

  async createProduct(payload: Product) {
    payload = Validator.validate(ProductSchema.CreateProductSchema, payload);

    const result = await this._productRepository.create(payload);

    return result;
  }

  async getAll(range: string | number) {
    range = Number(range);

    const result = await this._productRepository.find(range);

    return result;
  }

  async getById(id: number) {
    const result = await this._productRepository.get(id);

    if (!result) {
      throw new NotFound('Produk tidak ditemukan');
    }

    return result;
  }

  async searchByName(q: string) {
    const result = await this._productRepository.search(q);

    return result;
  }

  async updateProductById(id: number, payload: Partial<Product>) {
    payload = Validator.validate(ProductSchema.UpdateProductSchema, payload);

    const product = await this._productRepository.get(id);

    if (!product) {
      throw new NotFound('Produk tidak ditemukan');
    }

    const result = await this._productRepository.update(id, payload);

    return result;
  }

  async deleteProductById(id: number) {
    const product = await this._productRepository.get(id);

    if (!product) {
      throw new NotFound('Produk tidak ditemukan');
    }

    const result = await this._productRepository.delete(id);

    return result;
  }

  async getFileMetadata(filename: string) {
    const result = await this._productRepository.getByFilename(filename);

    if (!result) {
      throw new NotFound('File tidak ditemukan');
    }

    try {
      const now = new Date().toISOString();
      const dirName = now.split('T')[0];

      let filepath = path.join(process.cwd(), 'uploads', filename);

      if (filename !== 'default-product.jpg') {
        filepath = path.join(process.cwd(), 'uploads', dirName, filename);
      }

      const stats = await fs.stat(filepath);

      logger.info(`File size: ${stats.size}`, { stats });

      return {
        stats,
        filepath,
      };
    } catch (error) {
      logger.error(`Fs error : ${(error as Error).message}`, { error });
      throw new NotFound('File not found');
    }
  }

  async getFileMetadataById(id: number) {
    const product = await this._productRepository.get(id);

    if (!product) {
      throw new NotFound('Gambar produk tidak ditemukan');
    }

    try {
      const now = new Date().toISOString();
      const dirName = now.split('T')[0];
      const filename = product.image;

      let filepath = path.join(process.cwd(), 'uploads', filename!);

      if (filename !== 'default-product.jpg') {
        filepath = path.join(process.cwd(), 'uploads', dirName, filename!);
      }

      const stats = await fs.stat(filepath);

      logger.info(`File size: ${stats.size}`, { stats });

      return {
        stats,
        filepath,
      };
    } catch (error) {
      logger.error(`Fs error : ${(error as Error).message}`, { error });
      throw new NotFound('File not found');
    }
  }

  async getRangeProductPrice() {
    const result = await this._productRepository.getRangePrice();

    return result;
  }

  async getAllCategories() {
    const result = await this._categoryRepository.find();

    return result;
  }
}

export default ProductService;
