import type { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import ProductService from '@services/product.service';
import { sendResponse } from '@utils/sendResponse';
import { Product } from '@models/products.model';

class ProductController {
  constructor(private _service: ProductService) {
    this.addNewProduct = this.addNewProduct.bind(this);
    this.getAllProducts = this.getAllProducts.bind(this);
    this.getProductById = this.getProductById.bind(this);
    this.getMinMaxProductPrice = this.getMinMaxProductPrice.bind(this);
    this.searchAllProducts = this.searchAllProducts.bind(this);
    this.downloadProductImage = this.downloadProductImage.bind(this);
    this.previewProductImage = this.previewProductImage.bind(this);
    this.editProduct = this.editProduct.bind(this);
  }

  async addNewProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, categoryId, price, availability, brand, description } =
        req.body as Product;

      const file = req.file;

      const payload: Product = {
        name,
        categoryId,
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
      const { q = '' } = req.query;

      const response = await this._service.searchByName(q as string);

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

  async getMinMaxProductPrice(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await this._service.getRangeProductPrice();

      return sendResponse(
        {
          statusCode: StatusCodes.OK,
          message: 'Berhasil mendapatkan range produk',
          status: 'success',
          data: response,
        },
        res
      );
    } catch (error) {
      next(error);
    }
  }

  async editProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const { name, categoryId, price, availability, brand, description } =
        req.body as Product;

      const file = req.file;

      const payload: Partial<Product> = {
        name,
        categoryId,
        price,
        availability,
        brand,
        description,
        image: file?.filename,
      };

      await this._service.updateProductById(+id, payload);

      return sendResponse(
        {
          statusCode: 200,
          message: 'Berhasil memperbaharui produk',
          status: 'success',
        },
        res
      );
    } catch (error) {
      next(error);
    }
  }

  async previewProductImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { filename } = req.params;

      const { filepath } = await this._service.getFileMetadata(filename);

      res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache selama satu tahun

      res.sendFile(filepath);
    } catch (error) {
      next(error);
    }
  }

  async downloadProductImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { filename } = req.params;

      const { stats, filepath } = await this._service.getFileMetadata(filename);

      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Length', stats.size);
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${filename}"`
      );
      res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache selama satu tahun

      const readStream = fs.createReadStream(filepath);
      readStream.pipe(res);
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
