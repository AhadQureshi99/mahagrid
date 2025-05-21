"use client";

import React from "react";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import { toast } from "react-hot-toast"; // Import toast

const ClientProductPage = ({ product }) => {
  if (!product) return notFound();

  const discountPercent = Math.round(
    100 - (product.productdiscountedprice / product.productbaseprice) * 100
  );

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Item added to cart!"); // Show toast notification
  };

  return (
    <div className="min-h-screen bg-white pt-20 px-4 md:px-20">
      <Navbar />
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Thumbnails */}
        <div className="flex flex-col gap-3">
          {product.productimages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`product-${i}`}
              className="w-20 h-20 object-cover border cursor-pointer"
            />
          ))}
        </div>

        {/* Middle: Main Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={product.productimages[0]}
            alt={product.productname}
            className="object-cover max-w-[500px] w-full"
          />
        </div>

        {/* Right: Info */}
        <div className="w-full md:w-[400px] space-y-3 text-black">
          <h2 className="text-xl font-semibold">{product.productname}</h2>
          <p className="text-gray-500 line-through">
            ${product.productbaseprice}
          </p>
          <p className="text-xl font-bold">${product.productdiscountedprice}</p>
          <p className="text-red-500">{discountPercent}% OFF</p>
          <p className="text-sm text-gray-500">
            Product Code: {product._id.toString().slice(-6)}
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-2 mt-6">
            <button className="border py-2">Wishlist</button>
            <button
              onClick={handleAddToCart}
              className="bg-black text-white py-2"
            >
              Add to Cart
            </button>
            <button className="bg-gray-800 text-white py-2">Buy Now</button>
          </div>

          {/* Info Section */}
          <div className="text-sm text-gray-600 mt-6 space-y-3">
            <p>
              Please take into consideration that some products may take
              additional time for delivery and processing.
            </p>
            <p>
              Important: Your order is shipped once your payment has been
              cleared. Please contact our customer service center if you would
              like to request an exchange or return on your order.
            </p>
            <p>
              <strong>Customs and Duties:</strong> The recipient will be held
              responsible for international shipments which may be subject to
              import duties and taxes.
            </p>
            <p className="underline">Return & Exchange</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProductPage;
