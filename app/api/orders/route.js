// app/api/orders/route.js

import { connectDB } from "@/app/server/connect";
import Order from "@/app/server/models/orderModel";

export async function GET() {
  await connectDB();

  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(orders));
  } catch (error) {
    return new Response("Failed to fetch orders", { status: 500 });
  }
}
