import React from 'react';

const SecondaryImage = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img 
        className="w-full h-full object-cover"
        src="https://mahagrid.net/banner/main_store.jpg" 
        alt="Secondary Background" 
      />
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
        <h5 className="text-white text-2xl md:text-7xl font-semibold uppercase tracking-wide">
          STOCKIST
        </h5>
        <a 
          href="#" 
          className="mt-4 inline-block text-white text-lg md:text-xl "
        >
           Store Information
        </a>
      </div>
    </div>
  );
}

export default SecondaryImage;
