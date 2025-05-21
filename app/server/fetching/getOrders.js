// app/server/fetching/getOrders.js
import { connectDB } from "../connect";
import Order from "../models/orderModel";

export async function getAllOrders() {
  try {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    console.error("Failed to fetch orders:", error.message);
    return [];
  }
}
