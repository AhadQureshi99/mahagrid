import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 p-10 text-sm">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h6 className="font-semibold">Company Info</h6>
          <p>Company Name: Mediquitous</p>
          <p>CEO: Doojin Lee</p>
          <p>Address: 3rd Floor, Jiyoung Building, 644 Nonhyeon-ro, Gangnam-gu, Seoul</p>
          <p>Business Number: 301-87-00296</p>
          <p>Online Sales Report No: 2017-Seoul-Gangnam-02608</p>
          <p>Privacy Officer: Yujeong Choi</p>
        </div>

        <div>
          <h6 className="font-semibold">Customer Service</h6>
          <p>Phone: 1566-0409</p>
          <p>Business Hours: 10:00 AM - 5:00 PM</p>
          <p>(Lunch Break: 12:00 PM - 1:00 PM, Closed on Saturdays, Sundays, and Holidays)</p>
          <p>Customer Support: help@mahagrid.com</p>
          <p>Partnership Proposals: sales@mahagrid.com</p>
          <p>Marketing: marketing@mahagrid.com</p>
        </div>

        <div>
          <h6 className="font-semibold">Community</h6>
          <p>Notices</p>
          <p>Q&A</p>
          <p>Review</p>
        </div>
      </div>

      <div className="container mx-auto flex justify-between items-center mt-10">
        <p className="text-gray-500">© MAHAGRID INC.</p>

        <div className="flex space-x-4 text-gray-700">
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Contact Us</a>
        </div>

        
      </div>

      <div className="text-right mt-5">
        <h1 className="text-4xl font-bold italic">mahagrid.</h1>
      </div>
    </footer>
  );
};

export default Footer;
