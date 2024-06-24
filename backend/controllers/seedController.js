import Product from '../models/Product.js';
import User from '../models/User.js';
import data from '../data.js';

const seedData = async (req, res) => {
  try {
    await Promise.all([Product.deleteMany({}), User.deleteMany({})]);

    const createdProducts = await Product.insertMany(data.products);
    const createdUsers = await User.insertMany(data.users);

    res.send({createdProducts, createdUsers});
    
  } catch (error) {
    console.log(`failed to update users/products: ${error.message}`);
  }
}

export default seedData

//rafce = To initiate react component