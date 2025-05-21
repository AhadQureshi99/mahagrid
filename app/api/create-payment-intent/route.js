// app/api/create-payment-intent/route.js or route.ts

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectDB } from "@/app/server/connect";
import Order from "@/app/server/models/orderModel";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { cartItems } = await req.json();
    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
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
            images: [item.productimages?.[0]],
          },
          unit_amount: item.productdiscountedprice * 100,
        },
        quantity: 1,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    });

    // Save order in MongoDB
    await connectDB();
    await Order.create({
      items: cartItems,
      totalAmount,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error("Stripe Checkout Error:", err);
    return NextResponse.json(
      { error: "Failed to create payment session" },
      { status: 500 }
    );
  }
}
