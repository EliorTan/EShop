import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../utils.js';
import { addOrder, getOrderById } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/', isAuth, expressAsyncHandler(addOrder))
orderRouter.get('/:id', isAuth, expressAsyncHandler(getOrderById))

export default orderRouter;