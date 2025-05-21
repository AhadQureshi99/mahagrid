// app/success/page.jsx
"use client";

import { useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Clear the cart from localStorage
    localStorage.removeItem("cart");
  }, []);

  return (
    <div className="min-h-screen pt-20 px-4 md:px-20 bg-white">
      <Navbar />
      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold mb-4 text-green-600">Payment Successful!</h1>
        <p className="text-gray-600">Thank you for your purchase.</p>
        <button
          onClick={() => router.push("/")}
          className="mt-6 px-6 py-2 bg-black text-white rounded"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
