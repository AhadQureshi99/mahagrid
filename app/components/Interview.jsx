import React from 'react';

const Interview = () => {
  return (
    <div className="container-fluid mt-5 p-10">
      <h5 className="text-sm uppercase text-center md:text-start font-semibold">
        MAGAZINE UPDATE
      </h5>

      <div className="grid grid-cols-1  lg:grid-cols-3 gap-6 mt-4">
        <div className="flex flex-col items-center md:items-start gap-3">
          <img
            src="https://cafe24img.poxo.com/mahagrid/web/product/medium/202407/5ac50052d62f5f3596a60eca9e5ebc1c.jpg"
            alt="Interview"
            className="w-full rounded shadow-md"
          />
          <h5 className="text-sm uppercase text-center md:text-start font-semibold">
            [INTERVIEW] 김호연
          </h5>
        </div>
        <div className="flex flex-col items-center md:items-start gap-3">
          <img
            src="https://cafe24img.poxo.com/mahagrid/web/product/medium/202405/b9c4004af34753caf54338f49fc5e0ae.jpg"
            alt="Interview"
            className="w-full rounded shadow-md"
          />
          <h5 className="text-sm uppercase text-center md:text-start font-semibold">
            [INTERVIEW] 김호연
          </h5>
        </div>
        <div className="flex flex-col items-center md:items-start gap-3">
          <img
            src="https://cafe24img.poxo.com/mahagrid/web/product/medium/202404/f0d8c1580cb98129297dcfa6ef76bf3f.jpg"
            alt="Interview"
            className="w-full rounded shadow-md"
          />
          <h5 className="text-sm uppercase text-center md:text-start font-semibold">
            [INTERVIEW] 김호연
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Interview;
