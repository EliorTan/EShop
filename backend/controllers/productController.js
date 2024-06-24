import Product from '../models/Product.js';

const getProducts = async (req, res) => {
    const products = await Product.find({});
    res.send(products);

}

export {getProducts}

//rafce = To initiate react component