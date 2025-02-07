import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StockSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allStocks, setAllStocks] = useState([]);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  // Fetch all stocks when component mounts
  useEffect(() => {
    const fetchAllStocks = async () => {
      try {
        const response = await axios.get('https://scanner.tradingview.com/india/scan');
        const stocks = response.data.data.map(item => ({
          symbol: item.s.replace('BSE:', ''),
          fullSymbol: item.s
        }));
        setAllStocks(stocks);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };
    fetchAllStocks();
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    setIsLoading(true);

    if (value.trim()) {
      const filtered = allStocks.filter(stock => 
        stock.symbol.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 10); // Limit to 10 suggestions
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    setIsLoading(false);
  };

  const handleSelectStock = (symbol) => {
    setSearchTerm('');
    setShowSuggestions(false);
    // Remove BSE: prefix for the URL
    const cleanSymbol = symbol.replace('BSE:', '');
    navigate(`/analysis?tvwidgetsymbol=${cleanSymbol}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      handleSelectStock(suggestions[0].fullSymbol);
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for stocks (e.g., RELIANCE, TCS)"
          className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 lg:text-sm text-base"
        />
        <i className="fas fa-search absolute left-3 top-4 text-gray-400"></i>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && searchTerm && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : suggestions.length > 0 ? (
            suggestions.map((stock) => (
              <div
                key={stock.fullSymbol}
                onClick={() => handleSelectStock(stock.fullSymbol)}
                className="p-3 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-gray-800">{stock.symbol}</p>
                </div>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                  BSE
                </span>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No stocks found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StockSearch;