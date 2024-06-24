import express from 'express';
import { getProducts } from '../controllers/productController.js';

const productRouter = express.Router()
productRouter.get('/', getProducts);

export default productRouter;