import React, { useState, useEffect } from "react";
import {
  CompanyProfile,
  FundamentalData,
  TechnicalAnalysis,
  MiniChart,
} from "react-ts-tradingview-widgets";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";
import { FiRefreshCw, FiLoader } from "react-icons/fi";

const StocksAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [timePeriod, setTimePeriod] = useState("1y");
  const [symbol, setSymbol] = useState("RELIANCE");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tvSymbol = params.get("tvwidgetsymbol");
    if (tvSymbol) {
      setSymbol(tvSymbol);
    }
  }, [location]);

  const getAIAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const response = await axios.post("https://stockify-fastapi.onrender.com/get-stock-analysis", {
        symbol: `${symbol}.NS`,
        time_period: timePeriod
      });
      setAnalysisData(response.data);
      setShowReport(true);
    } catch (error) {
      console.error("Error fetching AI analysis:", error);
      alert("Failed to get AI analysis. Please try again.");
    }
    setIsAnalyzing(false);
  };

  const renderMarkdown = (text) => {
    if (!text) return null;

    const sections = text.split('\n\n');
    return sections.map((section, index) => {
      if (section.startsWith('##')) {
        return <h2 key={index} className="text-xl font-bold mt-6 mb-3">{section.replace('##', '').trim()}</h2>;
      } else if (section.startsWith('**')) {
        const parts = section.split('**');
        return (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{parts[1]}</h3>
            <p className="text-gray-700">{parts[2]}</p>
          </div>
        );
      } else if (section.startsWith('*')) {
        return (
          <ul key={index} className="list-disc pl-6 mb-4">
            {section.split('\n').map((item, i) => (
              <li key={i} className="text-gray-700 mb-2">{item.replace('* ', '')}</li>
            ))}
          </ul>
        );
      }
      return <p key={index} className="text-gray-700 mb-4">{section}</p>;
    });
  };

  return (
    <div className="space-y-6">
      {/* Time Period Selection and Analysis Button */}
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
        <div className="flex items-center gap-4">
          <label className="text-gray-700">Time Period:</label>
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="border rounded-md p-2"
          >
            <option value="1y">1 Year</option>
            <option value="2y">2 Years</option>
            <option value="5y">5 Years</option>
          </select>
        </div>
        <button
          onClick={getAIAnalysis}
          disabled={isAnalyzing}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <>
              <FiLoader className="w-4 h-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>Analyze Stock with AI</>
          )}
        </button>
      </div>

      {/* TradingView Widgets */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Mini Chart</h3>
          <MiniChart colorTheme="light" width="100%" symbol={symbol}/>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Company Profile</h3>
          <CompanyProfile colorTheme="light" width="100%" height={400} symbol={symbol}/>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Fundamental Data</h3>
          <FundamentalData colorTheme="light" width="100%" displayMode="regular" symbol={symbol}/>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Technical Analysis</h3>
          <TechnicalAnalysis colorTheme="light" width="100%" symbol={symbol}/>
        </div>
      </div>

      {/* AI Analysis Report Modal */}
      <Modal 
        isOpen={showReport} 
        onClose={() => setShowReport(false)}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">AI Analysis Report</h2>
            <button
              onClick={getAIAnalysis}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
            >
              <FiRefreshCw className="w-4 h-4" />
              Regenerate
            </button>
          </div>

          {analysisData && (
            <div className="space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Fundamental Data */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Price Metrics</h3>
                  <p>Current Price: ₹{analysisData.fundamental_data.Current_Price}</p>
                  <p>PE Ratio: {analysisData.fundamental_data.PE_Ratio}</p>
                  <p>Forward PE: {analysisData.fundamental_data.Forward_PE}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Company Metrics</h3>
                  <p>Market Cap: ₹{(analysisData.fundamental_data.Market_Cap / 1e9).toFixed(2)}B</p>
                  <p>EPS: ₹{analysisData.fundamental_data.EPS}</p>
                  <p>ROE: {(analysisData.fundamental_data.Return_on_Equity * 100).toFixed(2)}%</p>
                </div>
              </div>

              {/* Technical Indicators */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Technical Indicators</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p>RSI: {analysisData.technical_indicators.RSI}</p>
                    <p>SMA 50: ₹{analysisData.technical_indicators.SMA_50}</p>
                    <p>EMA 50: ₹{analysisData.technical_indicators.EMA_50}</p>
                  </div>
                  <div>
                    <p>Price Change: {analysisData.technical_indicators.Price_Change_Percentage}%</p>
                    <p>SMA 200: ₹{analysisData.technical_indicators.SMA_200}</p>
                    <p>EMA 200: ₹{analysisData.technical_indicators.EMA_200}</p>
                  </div>
                </div>
              </div>

              {/* Comprehensive Analysis */}
              <div className="prose max-w-none">
                {renderMarkdown(analysisData.comprehensive_analysis)}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default StocksAnalysis;
