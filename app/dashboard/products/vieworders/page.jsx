// app/dashboard/products/vieworders/page.jsx
"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error loading orders:", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/delete-order?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete order");
      }

      toast.success("Order deleted!");

      // Update the state to remove the deleted order
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
    } catch (err) {
      console.error("Delete Error:", err.message);
      toast.error(err.message || "Failed to delete order");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const res = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      const updated = await res.json();
      setOrders((prev) =>
        prev.map((order) => (order._id === id ? updated : order))
      );
      toast.success("Order updated");
    } else {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="p-4 border rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-white">Order #{order._id.slice(-6)}</h2>
              <div className="space-x-2">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="border px-2 py-1 rounded text-black"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <button
                  onClick={() => handleDelete(order._id)}
                  className="text-red-400 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-sm text-white">Total: ${order.totalAmount}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="text-xs text-white">
                  <img
                    src={item.productimages?.[0]}
                    alt={item.productname}
                    className="w-20 h-20 object-cover mb-1 rounded"
                  />
                  {item.productname}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewOrders;
