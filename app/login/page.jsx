"use client";
import Navbar from "../components/Navbar";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { SignIn } from "../server/actions/adding";
import { useRouter } from "next/navigation";

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const signInUser = async () => {
    try {
      const user = await SignIn(formData.email, formData.password);

      if (!user || !user.username) {
        throw new Error("User data is missing username in the database.");
      }

      localStorage.setItem("next-user", JSON.stringify(user));
      toast.success(`Welcome, ${user.username}!`);

      router.push("/");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex bg-white items-center justify-center h-screen pt-20">
        <div className="w-[500px] bg-white p-8">
          <h4 className="text-center text-2xl font-bold text-black">Sign In</h4>
          <form
            className="mt-6 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              signInUser();
            }}
          >
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border hover:bg-[#E8F0FE] border-black focus:outline-none focus:ring-2 focus:ring-black placeholder:text-black placeholder:text-sm"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 border hover:bg-[#E8F0FE] border-black focus:outline-none focus:ring-2 focus:ring-black placeholder:text-black placeholder:text-sm"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="text-gray-500" />
                ) : (
                  <Eye className="text-gray-500" />
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 hover:bg-gray-800 transition"
            >
              Sign In
            </button>
          </form>

          <div className="text-center mt-4 text-sm text-gray-500">
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>{" "}
            <span className="text-black">|</span>{" "}
            <a href="/signup" className="hover:underline">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
