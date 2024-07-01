import express from 'express';
import { getProducts, getProductById } from '../controllers/productController.js';
import expressAsyncHandler from 'express-async-handler';


const productRouter = express.Router()
productRouter.get('/', expressAsyncHandler(getProducts));
productRouter.get('/:id', expressAsyncHandler(getProductById));

export default productRouter;