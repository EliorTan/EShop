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

export {getProducts}

//rafce = To initiate react component