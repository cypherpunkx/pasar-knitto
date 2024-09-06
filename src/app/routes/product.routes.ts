import express from 'express';
import ProductRepository from '@repositories/product.repository';
import ProductService from '@services/product.service';
import ProductController from '@controllers/product.controller';
import db from '@configs/db';
import upload from '@configs/multer';

const router = express.Router();

const repository = new ProductRepository(db);
const service = new ProductService(repository);
const controller = new ProductController(service);

router.get('/', controller.getAllProducts);
router.get('/search', controller.searchAllProducts);
router.get('/:id', controller.getProductById);
router.post('/', upload.single('image'), controller.addNewProduct);

export default router;
