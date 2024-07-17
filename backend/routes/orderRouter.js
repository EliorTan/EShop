import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../utils.js';
import { addOrder, getOrderById } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.get('/:id', isAuth, expressAsyncHandler(getOrderById))
orderRouter.post('/', isAuth, expressAsyncHandler(addOrder))

export default orderRouter;