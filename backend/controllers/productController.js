import Product from '../models/Product.js';

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.send(products);

    }
    catch (err) {
        console.log(err.message + '\n' + "Error with products");
    }

}

const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.status(404).send({ message: 'Product Not Found' });
    }
}

export {getProducts,getProductById}

//rafce = To initiate react component