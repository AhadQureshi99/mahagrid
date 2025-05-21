"use client";

import { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

console.log("Stripe Publishable Key:", process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
if (!publishableKey) {
  throw new Error("Stripe publishable key is not defined in NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY");
}
const stripePromise = loadStripe(publishableKey);

const Page = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const validCart = Array.isArray(storedCart)
        ? storedCart.filter(
            (item) =>
              item &&
              typeof item === "object" &&
              item._id &&
              item.productname &&
              item.productdiscountedprice !== undefined
          )
        : [];
      setCart(validCart);
      console.log("Loaded cart:", validCart);
    } catch (error) {
      console.error("Error parsing cart from localStorage:", error);
      setCart([]);
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }, []);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item removed from cart!");
  };

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    console.log("Sending request to /api/create-payment-intent with cart:", cart);

    const response = await fetch("/api/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({ cartItems: cart }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Response not OK:", response.status, response.statusText, text);
      toast.error(`Server error: ${response.status} - ${response.statusText}`);
      return;
    }

    let data;
    try {
      data = await response.json();
      console.log("Backend response:", data);
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      const text = await response.text();
      console.error("Raw response:", text);
      toast.error("Invalid response from server");
      return;
    }

    if (data.error) {
      toast.error(data.error);
      return;
    }

    const { sessionId } = data;
    if (!sessionId) {
      toast.error("No session ID returned from the server");
      return;
    }

    const result = await stripe.redirectToCheckout({ sessionId });

    if (result.error) {
      toast.error(result.error.message);
    }
  };

  if (!cart.length) {
    return (
      <div className="min-h-screen bg-white pt-20 px-4 md:px-20">
        <Navbar />
        <h1>Your Cart is Empty</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20 px-4 md:px-20">
      <Navbar />
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {cart.map((item, index) => {
          if (!item || !item._id) {
            console.error(`Invalid cart item at index ${index}:`, item);
            return null;
          }

          return (
            <div key={index} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.productimages?.[0] || "/placeholder-image.jpg"}
                  alt={item.productname || "Unknown Product"}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.productname || "Unnamed Product"}</h2>
                  <p className="text-gray-500 text-sm">
                    Product Code: {item._id?.toString().slice(-6) || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-lg font-semibold">
                  ${item.productdiscountedprice ?? "0.00"}
                </p>
                <button
                  onClick={() => handleRemoveFromCart(item._id)}
                  className="text-red-500 text-sm mt-2 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between mb-4">
          <p className="font-semibold">Total</p>
          <p className="font-semibold">
            ${cart.reduce((total, item) => total + (item.productdiscountedprice || 0), 0)}
          </p>
        </div>
        <button
          onClick={handleCheckout}
          className="w-full py-2 bg-black text-white font-semibold"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Page;