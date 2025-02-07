import React, { useState, useEffect } from "react";
import axios from "axios";

const PortfolioTest = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Function to create a test portfolio
  const createPortfolio = async () => {
    setError(""); setMessage(""); // Reset messages

    try {
      const response = await axios.post(
        "http://localhost:3500/api/v1/portfolio/create",
        {
          portfolio_name: "Test Portfolio",
          portfolio_balance: 5000,
          investment_type: "sip",
          experience: "Beginner",
          risk: "Low",
          amount: 5000
        },
        { withCredentials: true } // Sends cookies for authentication
      );

      setMessage("Portfolio created successfully!");
      console.log("Created Portfolio:", response.data);
      fetchPortfolios(); // Refresh portfolio list
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create portfolio.");
    }
  };

  // Function to fetch all portfolios
  const fetchPortfolios = async () => {
    setError(""); setMessage(""); // Reset messages

    try {
      const response = await axios.get("http://localhost:3500/api/v1/portfolio/user/all", {
        withCredentials: true, // Sends authentication cookies
      });

      setPortfolios(response.data.portfolios);
      console.log("Fetched Portfolios:", response.data.portfolios);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch portfolios.");
    }
  };

  // Fetch portfolios when the component mounts
  useEffect(() => {
    fetchPortfolios();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Portfolio API Test</h2>

      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}

      <button
        onClick={createPortfolio}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-4"
      >
        Create Portfolio
      </button>

      <button
        onClick={fetchPortfolios}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
      >
        Fetch Portfolios
      </button>

      <h3 className="text-xl font-semibold mt-6">All Portfolios</h3>
      {portfolios.length > 0 ? (
        <ul className="mt-4">
          {portfolios.map((portfolio) => (
            <li key={portfolio._id} className="border p-3 my-2 rounded-md bg-gray-100">
              <p><strong>Name:</strong> {portfolio.portfolio_name}</p>
              <p><strong>Balance:</strong> ${portfolio.portfolio_balance}</p>
              <p><strong>Type:</strong> {portfolio.portfolio_type}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No portfolios found.</p>
      )}
    </div>
  );
};

export default PortfolioTest;
