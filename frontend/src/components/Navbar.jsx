import React, { useState } from "react";
import { Link } from "react-router-dom"; 

const Navbar = () => {
  // State to control the mobile navigation
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="flex justify-between items-center py-6 px-8 bg-white border-b-2 border-gray-300">
      {/* Logo */}
      <div className="text-3xl font-bold text-black">Stockify</div>

      {/* Desktop Navigation */}
      <nav className="space-x-8 text-black hidden md:flex">
        <Link to="/" className="text-lg font-medium hover:scale-105 hover:underline underline-offset-8">
          Home
        </Link>
        <Link to="/dashboard" className="text-lg font-medium hover:scale-105 hover:underline underline-offset-8">
          Dashboard
        </Link>
        <Link to="https://zerodha.com/varsity/" className="text-lg font-medium hover:scale-105 hover:underline underline-offset-8">
          Resources
        </Link>
        <Link to="#" className="text-lg font-medium hover:scale-105 hover:underline underline-offset-8">
          Pricing
        </Link>
      </nav>

      {/* Desktop Sign-in Button */}
      <Link to="/login">
        <button className="hidden md:block px-8 py-2 cursor-pointer font-medium text-white bg-black rounded-lg hover:scale-105 transition duration-300">
          Sign-in
        </button>
      </Link>

      {/* Mobile Navigation Button */}
      <div className="md:hidden">
        <button
          className="text-black text-2xl cursor-pointer active:scale-125 transition duration-300"
          onClick={toggleMobileMenu}
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg md:hidden z-10">
          <nav className="flex flex-col space-y-4 py-4 px-8">
            <Link
              to="/"
              className="text-lg font-medium hover:scale-105 hover:underline underline-offset-8"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="text-lg font-medium hover:scale-105 hover:underline underline-offset-8"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="https://zerodha.com/varsity/"
              className="text-lg font-medium hover:scale-105 hover:underline underline-offset-8"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Resources
            </Link>
            <Link
              to="#"
              className="text-lg font-medium hover:scale-105 hover:underline underline-offset-8"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link to="/login">
              <button
                className="px-8 py-2 cursor-pointer font-medium text-white bg-black rounded-lg hover:scale-105 transition duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign-in
              </button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
