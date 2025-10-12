import React from "react";
import { assetspic } from "../assets/assets_frontend/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm ">
        <div>
          <img className="mb-5 w-40" src={assetspic.logo} alt="logo" />
          <p className="w-2/3 mb-2/3 text-gray-600 leading-6">
            &#169; 2025 HealthConnect. All rights reserved. This platform is
            designed to help you find and book appointments with trusted doctors
            quickly and conveniently. For any support or inquiries, contact us
            at chakrabortysubham448@gmail.com or call +91 62xxxxxx28. Your health, our
            priority.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>privacy policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91 62xxxxxx28</li>
            <li>chakrabortysubham448@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">&#169; 2025@ precripto - All Right Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
