import express from 'express';
import ProductRepository from '@repositories/product.repository';
import ProductService from '@services/product.service';
import ProductController from '@controllers/product.controller';
import CategoryRepository from '@app/repositories/category.repository';
import auth from '@app/middlewares/auth.middleware';
import audit from '@app/middlewares/audit.middleware';
import upload from '@configs/multer';
import db from '@configs/db';

const router = express.Router();

const productRepository = new ProductRepository(db);
const categoryRepository = new CategoryRepository(db);
const service = new ProductService(productRepository, categoryRepository);
const controller = new ProductController(service);

router.use(auth);
router.use(audit);
router.get('/', controller.getAllProducts);
router.get('/search', controller.searchAllProducts);
router.get('/range-price', controller.getMinMaxProductPrice);
router.get('/categories', controller.getProductCategories);
router.get('/:id', controller.getProductById);
router.get('/download/:filename', controller.downloadProductImage);
router.get('/preview/:filename', controller.previewProductImage);
router.get('/:id/preview', controller.previewProductImageById);
router.get('/:id/download', controller.downloadProductImageById);
router.post('/', upload.single('image'), controller.addNewProduct);
router.put('/:id', upload.single('image'), controller.editProduct);
router.delete('/:id', controller.deleteProduct);

export default router;
