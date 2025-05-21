// app/server/models/productModel.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productname: {
      type: String,
      required: true,
      trim: true,
    },
    productdescription: {
      type: String,
      required: true,
      trim: true,
    },
    productbaseprice: {
      type: Number,
      required: true,
    },
    productdiscountedprice: {
      type: Number,
      default: 0,
    },
    productgender: {
      type: String,
      required: true,
      enum: ["Men", "Women"],
    },
    productimages: {
      type: [String], // Specify as array of strings for clarity
      required: true,
      default: [],
    },
    productcategory: {
      type: String,
      required: true,
      enum: ["Hoodie", "Shirt", "Sweatshirt", "Trouser", "Jeans", "Jacket"],
    },
  },
  { timestamps: true }
);

// Ensure the model is only created once
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;