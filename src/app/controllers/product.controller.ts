import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import ProductService from '@services/product.service';
import { sendResponse } from '@utils/sendResponse';
import { Product } from '@models/products.model';

class ProductController {
  constructor(private _service: ProductService) {
    this.addNewProduct = this.addNewProduct.bind(this);
    this.getAllProducts = this.getAllProducts.bind(this);
    this.getProductById = this.getProductById.bind(this);
    this.searchAllProducts = this.searchAllProducts.bind(this);
  }

  async addNewProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, category, price, availability, brand, description } =
        req.body;

      const file = req.file;

      const payload: Product = {
        name,
        category,
        price,
        availability,
        brand,
        description,
        image: file?.filename,
      };

      const response = await this._service.createProduct(payload);

      return sendResponse(
        {
          statusCode: StatusCodes.CREATED,
          message: 'Berhasil menambahkan produk',
          status: 'success',
          data: response,
        },
        res
      );
    } catch (error) {
      next(error);
    }
  }

  async getAllProducts(_req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this._service.getAll();

      return sendResponse(
        {
          statusCode: StatusCodes.OK,
          message: 'Berhasil mendapatkan semua produk',
          status: 'success',
          data: response,
        },
        res
      );
    } catch (error) {
      next(error);
    }
  }

  async searchAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { q } = req.query;

      const response = await this._service.searchByName({ q: q as string });

      return sendResponse(
        {
          statusCode: StatusCodes.OK,
          message: 'Berhasil mendapatkan semua produk berdasarkan pencarian',
          status: 'success',
          data: response,
        },
        res
      );
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const response = await this._service.getById(+id);

      return sendResponse(
        {
          statusCode: StatusCodes.OK,
          message: 'Berhasil mendapatkan semua produk',
          status: 'success',
          data: response,
        },
        res
      );
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
