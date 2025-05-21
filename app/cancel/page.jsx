// app/cancel/page.jsx
'use client';

import Link from 'next/link';

const CancelPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
      <p className="text-lg mb-6">You cancelled the payment. You can try again anytime.</p>
      <Link href="/cart">
        <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800">
          Return to Cart
        </button>
      </Link>
    </div>
  );
};

export default CancelPage;
