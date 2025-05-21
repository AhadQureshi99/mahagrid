"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { sidebar_data } from "../data/sidebardata";

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("next-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("next-user"); // Fixed this line
    setUser(null); // Clear user state
    router.push("/signin"); // Optional: Redirect to Sign In page
  };

  return (
    <div className="h-[99vh] self-start  w-full md:w-[35%] lg:w-[25%] xl:w-[20%] bg-secondary p-5">
      <div className="flex items-center gap-4">
        <div className="flex justify-center items-center rounded-full p-5 bg-gray-400">
          <FaUser className="text-white" />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-xl text-white">
            {user ? user.username : "Guest"}
          </h1>
          <p className="text-gray-300 text-sm">
            {user?.admin ? "Admin" : "User"}
          </p>
        </div>
      </div>

      <ul className="unstyled gap-4 capitalize font-bold text-gray-500 my-10 flex flex-col">
        {sidebar_data?.map((item, index) => (
          <div key={index}>
            <li>{item.title}</li>
            <ul className="unstyled gap-4 capitalize font-semibold text-white flex flex-col">
              {item?.list?.map((item2, index2) => (
                <li key={index2}>
                  <Link
                    href={item2.path}
                    className="flex hover:bg-gray-600 transition-all duration-200 p-3 cursor-pointer rounded-full gap-2 items-center"
                  >
                    {item2.icon}
                    {item2.title}
                  </Link>
                </li>
              ))}

              <li
                onClick={handleLogout}
                className="flex hover:bg-gray-600 transition-all duration-200 p-3 cursor-pointer rounded-full gap-2 items-center"
              >
                Logout
              </li>
            </ul>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
