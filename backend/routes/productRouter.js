import express from 'express';
import { getProducts, getProductById ,getProductByToken, getProductCategories, getProductsByQuery } from '../controllers/productController.js';
import expressAsyncHandler from 'express-async-handler';


const productRouter = express.Router()
productRouter.get('/', expressAsyncHandler(getProducts));
productRouter.get('/token/:token', expressAsyncHandler(getProductByToken));
productRouter.get('/categories', expressAsyncHandler(getProductCategories));
productRouter.get('/search', expressAsyncHandler(getProductsByQuery));
productRouter.get('/:id', expressAsyncHandler(getProductById));

export default productRouter;