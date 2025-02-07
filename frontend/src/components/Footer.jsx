import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="text-center mt-20 border-t border-gray-200 py-10">
      <a
        href="#"
        className="flex items-center justify-center mb-5 text-2xl font-semibold text-gray-900"
      >
        Stockify
      </a>

      <span className="block text-sm text-center text-gray-500">
        All Rights Reserved © 2025 Stockify™
      </span>

      <ul className="flex justify-center mt-5 space-x-5">
        <li>
          <a href="#" className="text-gray-500 hover:text-gray-900">
            <FaFacebookF className="w-5 h-5" />
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-500 hover:text-gray-900">
            <FaTwitter className="w-5 h-5" />
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-500 hover:text-gray-900">
            <FaInstagram className="w-5 h-5" />
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-500 hover:text-gray-900">
            <FaGithub className="w-5 h-5" />
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-500 hover:text-gray-900">
            <FaLinkedinIn className="w-5 h-5" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
