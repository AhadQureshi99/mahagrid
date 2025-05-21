// server/fetching/fetch.js

import { connectDB } from "../connect";
import Product from "../models/productModel";

connectDB();

const serializeProducts = (products) =>
  products.map((product) => ({
    ...product,
    _id: product._id.toString(), // 🔥 this is the fix
  }));

export const getMenProductsGroupedByCategory = async () => {
  const categories = ["Hoodie", "Shirt", "Sweatshirt", "Trouser", "Jeans", "Jacket"];
  const groupedProducts = {};

  for (const category of categories) {
    const products = await Product.find({
      productgender: "Men",
      productcategory: category,
    }).lean();

    groupedProducts[category] = serializeProducts(products);
  }

  return groupedProducts;
};

export const getWomenProductsGroupedByCategory = async () => {
  const categories = ["Hoodie", "Shirt", "Sweatshirt", "Trouser", "Jeans", "Jacket"];
  const groupedProducts = {};

  for (const category of categories) {
    const products = await Product.find({
      productgender: "Women",
      productcategory: category,
    }).lean();

    groupedProducts[category] = serializeProducts(products);
  }

  return groupedProducts;
};
