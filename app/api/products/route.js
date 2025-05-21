import { connectDB } from "@/app/server/connect";
import Product from "@/app/server/models/productModel";  // Adjust the path if necessary

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().lean();  // Adjust this if you want specific filtering
    return new Response(JSON.stringify(products), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
    });
  }
}
