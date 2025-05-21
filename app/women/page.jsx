import React from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import CategoryNav from "../components/Categorynav";
import { CiHeart } from "react-icons/ci";
import { getWomenProductsGroupedByCategory } from "../server/fetching/fetch";

const page = async () => {
  const groupedProducts = await getWomenProductsGroupedByCategory();

  return (
    <div className="bg-white min-h-screen pt-20">
      <div className="container">
        <Navbar />
        <CategoryNav />
        <div className="p-10 space-y-10">
          {Object.entries(groupedProducts).map(([category, products]) => (
            <div key={category}>
              <h5 className="text-lg text-center md:text-start font-semibold mb-4">
                Women / {category}
              </h5>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {products.map((item) => (
                  <Link href={`/women/${item._id}`} key={item._id}>
                    <div className="flex flex-col cursor-pointer hover:opacity-80 transition-all">
                      <div className="shadow-lg">
                        <img src={item.productimages[0]} alt={item.productname} />
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-black">{item.productname}</div>
                        <CiHeart />
                      </div>
                      <div className="text-xs text-gray-300">
                        <s>${item.productbaseprice}.00</s> ${item.productdiscountedprice}.00{" "}
                        <span className="text-red-400">
                          {Math.round(
                            100 -
                              (item.productdiscountedprice / item.productbaseprice) * 100
                          )}
                          % OFF
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
