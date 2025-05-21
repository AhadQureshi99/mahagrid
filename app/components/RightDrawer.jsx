"use client";

import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa6";

const RightDrawer = ({ open, onClose, user, handleLogout }) => {
  return (
    <div
      className={`fixed top-0 right-0 w-64 h-full bg-gray-800 shadow-lg transform ${
        open ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 z-50`}
    >
      <button
        className="absolute top-5 right-5 text-white text-lg"
        onClick={onClose}
      >
        ✖
      </button>
      <ul className="mt-20 text-center">
        {/* Display username and logout button on mobile */}
        {user ? (
          <>
            <li className="py-3 flex justify-center items-center gap-5 text-lg text-white cursor-pointer">
              <div className="rounded-full p-5 bg-gray-500">
                <FaUser size={20} />
              </div>
              {user.username}
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full py-3 text-lg text-white cursor-pointer border-t border-gray-600 hover:bg-gray-700"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li className="py-3 text-lg text-white hover:bg-gray-700 cursor-pointer">
            <Link href="/login" className="block w-full h-full">
              Login
            </Link>
          </li>
        )}
        <li className="py-3 text-lg text-white hover:bg-gray-700 cursor-pointer">
          <Link href="/" className="block w-full h-full">
            Home
          </Link>
        </li>
        <li className="py-3 text-lg text-white hover:bg-gray-700 cursor-pointer">
          <Link href="/men" className="block w-full h-full">
            Men
          </Link>
        </li>
        <li className="py-3 text-lg text-white hover:bg-gray-700 cursor-pointer">
          <Link href="/women" className="block w-full h-full">
            Women
          </Link>
        </li>
        <li className="py-3 text-lg text-white hover:bg-gray-700 cursor-pointer">
          <Link href="/community" className="block w-full h-full">
            Community
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default RightDrawer;
