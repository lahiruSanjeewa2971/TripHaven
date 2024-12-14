import { CopyrightIcon } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-black text-white p-3 sm:p-13 md:p-16 lg:p-32 flex flex-col">
      <div className="border-b border-gray-700 flex flex-col justify-center gap-8 md:grid md:grid-cols-3 pb-5 sm:pb-20">
        {/* <div className="grid grid-cols-1 "> */}
        <div className="flex flex-col items-start gap-2">
          <h3 className="text-2xl font-bold">Quick Links</h3>
          <ul className="flex flex-col gap-4 mt-5">
            <li className="text-gray-400 cursor-pointer">About Us</li>
            <li className="text-gray-400 cursor-pointer">
              Terms & Conditions
            </li>
            <li className="text-gray-400 cursor-pointer">
              Privacy Policy
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-start gap-2">
          <h3 className="text-2xl font-bold">Support</h3>
          <ul className="flex flex-col gap-4 mt-5">
            <li className="text-gray-400 cursor-pointer">FAQs</li>
            <li className="text-gray-400 cursor-pointer">Help Center</li>
            <li className="text-gray-400 cursor-pointer">
              Contact Support
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-start gap-2">
          <h3 className="text-2xl font-bold">Contact Info</h3>
          <ul className="flex flex-col gap-4 mt-5">
            <li>Email: support@tripheaven.com</li>
            <li>Phone: +123 456 7890</li>
            <li>Address: 123 Heaven Street</li>
          </ul>
        </div>
        {/* </div> */}
      </div>

      <div className="flex flex-col gap-2 items-center justify-center text-center pt-20 opacity-55">
        <span className="flex items-center text-sm md:text-lg lg:text-1xl">
          <CopyrightIcon className="w-4 h-4 md:w-5 md:h-5  mr-1" />
          Copyright 2024. All Rights Reserved.
        </span>
        <span className="text-sm md:text-lg lg:text-1xl">
          Designed & Developed by TripHaven Team
        </span>
        <div className="flex gap-4">
          <span className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-600">
            F
          </span>
          <span className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-600">
            T
          </span>
          <span className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-600">
            I
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
