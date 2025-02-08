import React, { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { MiniChart, TickerTape, Timeline } from "react-ts-tradingview-widgets";
import { Link } from "react-router-dom"; 
import { useSelector,useDispatch } from "react-redux";
import {
  getUserPortfolios,
} from "../app/slices/portfolioSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const {
    portfolios = [],
    isLoading,
    error,
  } = useSelector((state) => state.portfolio);

  const totalInvestment = portfolios
    .reduce((acc, curr) => acc + Number(curr.portfolio_balance), 0)
    .toFixed(2);

      useEffect(() => {
        dispatch(getUserPortfolios());
      }, [dispatch]);
  return (
    <>
      {/* Stock Ticker */}
      <TickerTape
        colorTheme="light"
        largeChartUrl="https://stockify-pink.vercel.app/analysis"
        symbols={[
          { proName: "RELIANCE", title: "Reliance Industries" },
          { proName: "WIPRO", title: "WIPRO LTD" },
          { proName: "INFY", title: "Infosys" },
          { proName: "HDFCBANK", title: "HDFC Bank" },
          { proName: "ICICIBANK", title: "ICICI Bank" },
          { proName: "HINDUNILVR", title: "Hindustan Unilever" },
          { proName: "KOTAKBANK", title: "Kotak Mahindra Bank" },
          { proName: "BHARTIARTL", title: "Bharti Airtel" },
          { proName: "ITC", title: "ITC Limited" },
          { proName: "AXISBANK", title: "Axis Bank" },
          { proName: "MARUTI", title: "Maruti Suzuki" },
          { proName: "ASIANPAINT", title: "Asian Paints" },
          { proName: "TITAN", title: "Titan Company" },
          { proName: "ULTRACEMCO", title: "UltraTech Cement" },
          { proName: "POWERGRID", title: "Power Grid Corporation" },
          { proName: "SBIN", title: "State Bank of India" },
          { proName: "SUNPHARMA", title: "Sun Pharmaceutical Industries" },
          { proName: "DRREDDY", title: "Dr. Reddy's Laboratories" },
        ]}
      />

      {/* Stock Prices */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Stock Prices</h2>
        <div className="flex space-x-4 overflow-x-auto">
          <div className="bg-white p-4  min-w-[250px]">
            <MiniChart
              colorTheme="light"
              width="100%"
              isTransparent
              symbol="RELIANCE"
            />
          </div>
          <div className="bg-white p-4  min-w-[250px]">
            <MiniChart
              colorTheme="light"
              width="100%"
              isTransparent
              symbol="INFY"
            />
          </div>
          <div className="bg-white p-4  min-w-[250px]">
            <MiniChart
              colorTheme="light"
              width="100%"
              isTransparent
              symbol="HDFCBANK"
            />
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <h2 className="text-lg font-semibold mb-4 col-span-2">Portfolio</h2>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-sm text-gray-500">Invested</p>
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold">₹{totalInvestment}</p>
            <button className="bg-[#6425FE] text-white rounded-lg w-12 h-10 flex items-center justify-center">
              <Link to={"/portfolio"}><FaArrowRight className="text-white" /></Link>
            </button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-6 mb-4">Recent News</h2>
        <Timeline colorTheme="light" height={400} width="100%"></Timeline>
      </section>
    </>
  );
};

export default Dashboard;
