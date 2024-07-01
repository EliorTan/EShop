import express from "express";
import expressAsyncHandler from "express-async-handler";
import {signup, signin} from "../controllers/userController.js";

const userRouter = express.Router();
userRouter.post('/signin', expressAsyncHandler(signin))
userRouter.post('/signup', expressAsyncHandler(signup))

export default userRouter;