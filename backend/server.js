import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRouter.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers
app.use('/api/v1/seed',seedRouter);
app.use('/api/v1/products',productRouter);
app.use('/api/v1/users',userRouter);
app.use((err,req,res,next) => {
    res.status(500).send({message: err.message});
})

mongoose
    .connect(process.env.MONGO_STRING_CONNECTION)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on port: http://localhost:${PORT}`)
        )
    )
    .catch((error) => {
        console.log(error)
    })