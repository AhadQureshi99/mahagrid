// app/server/models/orderModel.js

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: [
    {
      productname: String,
      productimages: [String],
      productdiscountedprice: Number,
      _id: String,
    },
  ],
  totalAmount: Number,
  status: {
    type: String,
    default: "Pending", // e.g., Pending, Shipped, Cancelled
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
