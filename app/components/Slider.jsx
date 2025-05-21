"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { slider_data } from "@/app/data/slider-data";

const MySlider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    rtl: true,
    arrows: false, // Removes navigation arrows
  };

  if (!mounted) return null; // Prevents SSR errors

  return (
    <div className="container-fluid mt-5 p-10 ">
      {/* Weekly Pick Text */}
      <h5 className=" text-sm uppercase text-center md:text-start font-semibold">Weekly Pick</h5>

      <div className="slider-container mt-4">
        <Slider {...settings}>
          {slider_data.map((item, index) => (
            <div key={index} className="slide-item">
              <div className="image-container">
                <img
                  className="rounded shadow-md "
                  src={item.image}
                  alt={`Slide ${index}`}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <style jsx>{`
        
        .image-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px; /* Add some spacing around the image */
          border-radius: 8px; /* Optional: rounded corners */
          height: 100%; /* Fixed height */
          width:100%;
          overflow: hidden; /* Ensures no overflow */
        }

        .image-container img {
          width: 100%; /* Make image take full width */
          height: 100%; /* Fixed height */
          object-fit: contain; 
        }
      `}</style>
    </div>
  );
};

export default MySlider;
