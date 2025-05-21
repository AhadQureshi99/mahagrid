"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { addUser } from "../server/actions/adding";
import Navbar from "../components/Navbar";

const Page = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { username, email, password } = formData;
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object from the form
    const form = new FormData(e.target);

    // Call addUser function and get the result
    const result = await addUser(form);

    console.log("Result from addUser:", result); // Log result to check the returned object

    if (result.error) {
      toast.error(result.error); // Show error if there's an error
    } else {
      toast.success(result.success); // Show success if user is created

      // Save the user details (e.g., username) to localStorage or use global state
      localStorage.setItem("user", JSON.stringify(result.user)); // Store the user data

      router.push("/"); // Redirect to the home page after successful registration
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center bg-white justify-center h-screen pt-20">
        <div className="w-[500px] bg-white p-8">
          <h4 className="text-center text-2xl font-bold text-black">Sign Up</h4>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={handleChange}
              className="w-full p-3 border hover:bg-[#E8F0FE] border-black focus:outline-none focus:ring-2 focus:ring-black placeholder:text-black placeholder:text-sm"
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={email}
              onChange={handleChange}
              className="w-full p-3 border hover:bg-[#E8F0FE] border-black focus:outline-none focus:ring-2 focus:ring-black placeholder:text-black placeholder:text-sm"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              className="w-full p-3 border hover:bg-[#E8F0FE] border-black focus:outline-none focus:ring-2 focus:ring-black placeholder:text-black placeholder:text-sm"
            />
            <button className="w-full bg-black text-white py-3 hover:bg-gray-800 transition">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
