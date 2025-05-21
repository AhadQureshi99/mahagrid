"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { MdOutlineShoppingBag } from "react-icons/md";
import { BsList } from "react-icons/bs";
import RightDrawer from "./RightDrawer";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  // Check if user is logged in from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("next-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Detect screen size for mobile (adjust threshold as needed)
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Check cart items in localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItemCount(cart.length);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove the user from localStorage
    setUser(null); // Reset user state
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between p-6 items-center z-50 bg-transparent text-white transition-all duration-300 hover:bg-white hover:text-black">
      {/* Logo */}
      <img
        id="logo"
        width={150}
        height={150}
        className="transition-all duration-300"
        src="https://mahagrid.net/img/new_logo.svg"
        alt="Logo"
      />

      {/* Navbar Links */}
      <ul className="hidden md:flex gap-5 items-center">
        <li className="text-sm cursor-pointer">
          <Link href="/">Home</Link>
        </li>
        <li className="text-sm cursor-pointer">
          <Link href="/men">Men</Link>
        </li>
        <li className="text-sm cursor-pointer">
          <Link href="/women">Women</Link>
        </li>
        <li className="text-sm cursor-pointer">
          <Link href="/community">Community</Link>
        </li>
      </ul>

      {/* Icons & Mobile */}
      <div className="flex items-center gap-5">
        {/* Show username and logout button if user is logged in and on large screens */}
        {!isMobile && user ? (
          <>
            <span className="text-sm cursor-pointer">{user.username}</span>
            <button
              onClick={handleLogout}
              className="text-sm cursor-pointer border border-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login">
            <span className="hidden md:block text-sm cursor-pointer">
              Login
            </span>
          </Link>
        )}
        <CiSearch size={20} className="cursor-pointer text-black" />{" "}
        {/* Black icon */}
        <Link href="/cart">
          <div className="relative">
            <MdOutlineShoppingBag
              size={20}
              className="cursor-pointer text-black"
            />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {cartItemCount}
            </span>
          </div>
        </Link>
        <BsList
          className="md:hidden block cursor-pointer text-black" // Black icon
          size={25}
          onClick={() => setIsDrawerOpen(true)}
        />
        <RightDrawer
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          user={user}
          handleLogout={handleLogout}
        />
      </div>
    </nav>
  );
};

export default Navbar;
