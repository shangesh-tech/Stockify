import React from 'react';
import { Link } from "react-router-dom"; 

const MainSection = () => {
  return (
    <main className="text-center py-20 px-6 md:px-0">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-black">
        One place for all your
        <br />
        <span className="text-5xl sm:text-6xl lg:text-7xl">investment</span>
      </h1>
      <p className="mt-6 text-lg sm:text-xl text-gray-600">
        Invest in 1000+ equities for real-time Insights and reporting
      </p>
      <div className="mt-10">
        <button className="px-8 py-3 text-white font-medium bg-black rounded-lg hover:bg-gray-800 transition duration-300">
          <Link to={"/dashboard"}>Get Started</Link>
        </button>
      </div>
    </main>
  );
};

export default MainSection;
