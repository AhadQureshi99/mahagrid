"use client";

import React from "react";
import Navbar from "./components/Navbar";
import Mainimage from "./components/Mainimage";
import SecondaryImage from "./components/SecondaryImage";
import MySlider from "./components/Slider";
import Interview from "./components/Interview";
import Footer from "./components/Footer";

const Page = () => {
  return (
    <div className="relative min-h-screen bg-gray-100">
      <Navbar />
      <Mainimage />
      <SecondaryImage />
      <MySlider />
      <Interview />
      <Footer />
    </div>
  );
};

export default Page;
