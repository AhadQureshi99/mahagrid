import ClientProductPage from "@/app/men/[id]/ClientProductPage";
import { notFound } from "next/navigation";


export async function getProductData({ params }) {
  try {
    const { connectDB } = await import("@/app/server/connect");
    const Product = (await import("@/app/server/models/productModel")).default;

    await connectDB();

    if (!params.id || params.id.length !== 24) {
      return { notFound: true };
    }

    const product = await Product.findById(params.id).lean();
    if (!product) {
      return { notFound: true };
    }

    return {
      product: JSON.parse(JSON.stringify(product)),
    };
  } catch (error) {
    console.error("Error fetching product:", error.message);
    throw new Error("Internal Server Error: Unable to fetch product");
  }
}

export default async function Page({ params }) {
  const { product } = await getProductData({ params });

  if (!product) return notFound();

  return <ClientProductPage product={product} />;
}
