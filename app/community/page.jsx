'use client'
import React from "react";
import Navbar from "../components/Navbar";

const page = () => {
  return (
    <>
      <div className="bg-white h-screen pt-20">
        <Navbar />
        <div className="w-[75%] mx-auto">
          <div className="text-xl text-center fw-semibold ">NOTICE</div>
          <div className="mt-15">
            <hr />
          </div>
          <div className="flex justify-between p-5 items-center">
            <div className="text-sm">Shipping Notice</div>
            <div className="text-sm">MAHAGRID 2021-12-30</div>
          </div>
          <div className="">
            <hr />
          </div>
          <div className="text-sm  text-center mt-10">
            No results were found
          </div>
          <div className="grid grid-cols-1 my-4 gap-3 md:grid-cols-2">
            <select
              className=" border-1 p-3"
              name="productgender"
              defaultValue=""
              required
            >
              <option value="week">week</option>
              <option value="months">months</option>
              <option value="3 months">3 months</option>
              <option value="all">all</option>
            </select>

            <select
              className="border-1 p-3"
              name="productcategory"
              defaultValue=""
              required
            >
              <option value="Title">Title</option>
              <option value="content">Content</option>
              <option value="written by">Written by</option>
              <option value="id">Id</option>
              <option value="nickname">Nickname</option>
            </select>
          </div>
          <div className="flex justify-between items-center gap-3">
            <input type="search " className="p-3 border-1 w-[90%]" />
            <button className="bg-black px-5 p-3 text-white">Search</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
