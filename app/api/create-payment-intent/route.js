import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectDB } from "@/app/server/connect";
import Order from "@/app/server/models/orderModel";

// Validate environment variables at startup
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
}
if (!process.env.NEXT_PUBLIC_BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_BASE_URL is not defined in environment variables"
  );
}

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20", // Use the latest Stripe API version as of May 2025
});

export async function POST(req) {
  try {
    // Parse request body
    const { cartItems } = await req.json();

    // Validate cart items
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty or invalid" },
        { status: 400 }
      );
    }

    // Validate each cart item
    for (const item of cartItems) {
      if (
        !item.productname ||
        typeof item.productdiscountedprice !== "number" ||
        item.productdiscountedprice <= 0
      ) {
        return NextResponse.json(
          { error: `Invalid cart item: ${JSON.stringify(item)}` },
          { status: 400 }
        );
      }
    }

    // Calculate total amount
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + (item.productdiscountedprice || 0),
      0
    );

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.productname,
            images: item.productimages?.[0] ? [item.productimages[0]] : [],
          },
          unit_amount: Math.round(item.productdiscountedprice * 100), // Convert to cents
        },
        quantity: 1,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    });

    // Save order in MongoDB
    await connectDB();
    const order = await Order.create({
      items: cartItems,
      totalAmount,
      stripeSessionId: session.id, // Store Stripe session ID for reference
      createdAt: new Date(),
    });

    return NextResponse.json(
      { sessionId: session.id, orderId: order._id },
      { status: 200 }
    );
  } catch (err) {
    console.error("Stripe Checkout Error:", err.message);
    return NextResponse.json(
      { error: `Failed to create payment session: ${err.message}` },
      { status: 500 }
    );
  }
}
