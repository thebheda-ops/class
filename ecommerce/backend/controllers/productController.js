import Product from "../models/Product.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, price, imageUrl, description } = req.body;

    const product = await Product.create({
      name,
      price,
      imageUrl,
      description
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};
