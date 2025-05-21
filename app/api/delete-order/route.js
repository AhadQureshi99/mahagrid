// app/api/delete-order/route.js
import { connectDB } from "@/app/server/connect";
import Order from "@/app/server/models/orderModel";

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ error: "No ID provided" }), { status: 400 });
    }

    await connectDB();
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return new Response(JSON.stringify({ error: "Order not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Order deleted successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Delete Order Error:", error.message);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
