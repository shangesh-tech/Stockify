import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Avatar from "../assets/avatar.png";
import {
  FaThLarge,
  FaBriefcase,
  FaChartLine,
  FaListAlt,
  FaBook,
  FaSignOutAlt,
  FaQuestionCircle,
  FaBars,
  FaTimes,
  FaLaugh 
} from "react-icons/fa";

import StockSearch from "./StockSearch";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({ name: "Loading...", email: "Loading..." });

 
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          "https://stockify-backend-3mmq.onrender.com/api/v1/user/me",
          {
            withCredentials: true,
          }
        );
        console.log(response.data); 
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } lg:block w-64 bg-white p-6 shadow-lg fixed lg:relative z-50 lg:z-auto inset-0 lg:w-64 transition-all duration-300`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-gray-500 text-xl absolute top-4 right-4"
        >
          <FaTimes />
        </button>
        <h1 className="text-2xl font-bold mb-6">
          <Link to={"/"}>Stockify</Link>
        </h1>
        <nav>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3 text-gray-900 font-semibold hover:scale-105">
              <Link
                to="/dashboard"
                className="flex justify-center items-center gap-2"
              >
                <FaThLarge />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="flex items-center space-x-3 text-gray-900 font-semibold hover:scale-105">
              <Link
                to="/portfolio"
                className="flex justify-center items-center gap-2"
              >
                <FaBriefcase />
                <span>Portfolio</span>
              </Link>
            </li>
            <li className="flex items-center space-x-3 text-gray-900 font-semibold hover:scale-105">
              <Link
                to="/analysis"
                className="flex justify-center items-center gap-2"
              >
                <FaChartLine />
                <span>Market Analysis</span>
              </Link>
            </li>
            <li className="flex items-center space-x-3 text-gray-900 font-semibold hover:scale-105">
              <Link
                to="https://finance-analyzers.streamlit.app/"
                className="flex justify-center items-center gap-2"
              >
                <FaListAlt />
                <span>Finance Analyzer</span>
              </Link>
            </li>
            <li className="flex items-center space-x-3 text-gray-900 font-semibold hover:scale-105">
              <Link
                to="https://www.tickertape.in/market-mood-index"
                className="flex justify-center items-center gap-2"
              >
                <FaLaugh />
                <span>Fear/Greed Index</span>
              </Link>
            </li>
            <li className="flex items-center space-x-3 text-gray-900 font-semibold hover:scale-105">
              <Link
                to="https://zerodha.com/varsity/"
                className="flex justify-center items-center gap-2"
              >
                <FaBook />
                <span>Tutorial</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-10 p-4 bg-green-100 text-green-700 rounded-lg text-sm">
        <p className="font-bold mb-4">Thoughts Time</p>
          <img src="https://www.insidermonkey.com/blog/wp-content/uploads/2013/09/Warren-Buffett-portrait.jpg" className=" mx-auto rounded-full w-30 h-30 mb-4"/>
          
          <p className="italic font-semibold">
            If you aren't willing to own a stock for 10 years, don't even think
            about owning it for 10 minutes.
          </p>
        </div>

        <div className="mt-6">
          <Link to={"http://localhost:3500/api/v1/user/logout"} className="flex items-center space-x-2 text-red-600 hover:scale-105 font-semibold">
            <FaSignOutAlt />
            <span>Logout</span>
          </Link>
          <button className="flex items-center space-x-2 text-gray-900 font-semibold mt-3 hover:scale-105">
            <FaQuestionCircle />
            <span>Help & Support</span>
          </button>
        </div>
      </aside>

      
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-2">
          <button
            className="lg:hidden p-4 text-gray-500"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FaBars className="text-3xl" />
          </button>
          <div className="relative w-96 lg:w-80">
            <StockSearch />
          </div>
          <div className="items-center space-x-3 flex justify-center">
            <div className="flex items-center space-x-2">
              <img src={Avatar} className="size-12" />
              <div>
                <p className="text-sm font-bold">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Render children content */}
        {children}
      </main>
    </div>
  );
};

export default Layout;
