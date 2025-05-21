import React from 'react';

const Mainimage = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      
      {/* Video Background */}
      <video 
        src="mahagrid.mp4" 
        autoPlay 
        muted 
        loop 
        className="w-full h-full object-cover"
      ></video>

      {/* Text Content */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
        <h5 className="text-white text-2xl md:text-7xl font-bold uppercase tracking-wide">
          2025 Winter
        </h5>
        <a 
          href="#" 
          className="mt-4 inline-block text-white text-lg md:text-xl"
        >
          Buy Now
        </a>
      </div>
      
    </div>
  );
}

export default Mainimage;
