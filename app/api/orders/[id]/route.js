// app/api/orders/[id]/route.js

import { connectDB } from "@/app/server/connect";
import Order from "@/app/server/models/orderModel";

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = params;

  try {
    await Order.findByIdAndDelete(id);
    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    return new Response("Failed to delete order", { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  await connectDB();
  const { id } = params;
  const data = await req.json();

  try {
    const updated = await Order.findByIdAndUpdate(id, data, { new: true });
    return new Response(JSON.stringify(updated));
  } catch (error) {
    return new Response("Failed to update order", { status: 500 });
  }
}
