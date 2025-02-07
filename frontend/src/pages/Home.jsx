import React from "react";
import Header from "../components/Navbar";
import MainSection from "../components/Home/MainSection";
import Mockup from "../components/Home/Mockup";
import Footer from "../components/Footer";
import { TickerTape } from "react-ts-tradingview-widgets";

const Home = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <Header />
      <TickerTape
        colorTheme="light"
        largeChartUrl="http://localhost:5173/analysis"
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

      <MainSection />
      <Mockup />
      <Footer />
    </div>
  );
};

export default Home;
