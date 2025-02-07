const Portfolio = require("../models/portfolioModel");
const axios = require("axios");

/**
 * Fetches the portfolio summary from the Python FastAPI server.
 * Sends the investment details (experience, risk, investment_type, amount) to Python backend.
 * @param {Object} investmentDetails - The investment details object.
 * @returns {Promise<Object>} - The response data from the Python server.
 */
const fetchPortfolioSummaryFromPython = async (investmentDetails) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/get-investment-portfolio", investmentDetails);
    return response.data; // Expected to return { portfolio_allocation, portfolio_summary }
  } catch (error) {
    console.error("Error fetching portfolio summary from Python server:", error.message);
    throw new Error("Failed to fetch portfolio summary from AI server");
  }
};

/**
 * Create Portfolio
 * - Validates input fields.
 * - Sends investment details to the Python backend.
 * - Receives portfolio summary and allocation.
 * - Stores the data in MongoDB in `portfolio_data` as JSON.
 */
exports.createPortfolio = async (req, res) => {
  try {
    const {
      portfolio_name,
      portfolio_balance,
      experience,
      risk,
      investment_type,
      amount,
      
    } = req.body;
    const userId = req.user._id;

    // Validate required fields
    if (!portfolio_name || !portfolio_balance || !experience || !risk || !investment_type || !amount) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Ensure valid enum values
    const validExperience = ["Beginner", "Intermediate", "Advanced"];
    const validRisk = ["Low", "Conservative", "High"];
    const validInvestmentType = ["sip", "lumpsum"];

    if (!validExperience.includes(experience)) {
      return res.status(400).json({ error: "Invalid experience level" });
    }
    if (!validRisk.includes(risk)) {
      return res.status(400).json({ error: "Invalid risk level" });
    }
    if (!validInvestmentType.includes(investment_type)) {
      return res.status(400).json({ error: "Invalid Investment type" });
    }

    // Fetch portfolio data from Python backend
    const pythonResponse = await fetchPortfolioSummaryFromPython({
      experience,
      risk,
      investment_type,
      amount,
    });

    if (!pythonResponse || typeof pythonResponse !== "object") {
      return res.status(500).json({ error: "Invalid response from AI server" });
    }

    // Store the response directly as JSON in MongoDB
    const portfolio = new Portfolio({
      portfolio_owner_id: userId,
      portfolio_name,
      portfolio_balance,
      investment_type,
      user_info: [
        {
          Experience: experience,
          risk: risk
        },
      ],
      portfolio_data: pythonResponse, // ✅ Store as JSON (object)
    });

    await portfolio.save();
    res.status(201).json({ success: true, portfolio });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get Portfolio by ID
 * Retrieves a specific portfolio by its ID and populates the owner's name and email.
 */
exports.getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id).populate("portfolio_owner_id", "name email");

    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    res.status(200).json({ success: true, portfolio });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get All Portfolios of the Authenticated User
 * Retrieves all portfolios that belong to the logged-in user.
 */
exports.getAllPortfoliosByUser = async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ portfolio_owner_id: req.user._id });

    if (portfolios.length === 0) {
      return res.status(404).json({ error: "No portfolios found" });
    }

    res.status(200).json({ success: true, portfolios });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update Portfolio
 * Updates a portfolio's details. Only the owner can update the portfolio.
 */
exports.updatePortfolio = async (req, res) => {
  try {
    const { portfolio_name, portfolio_balance, investment_type } = req.body;
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    // Ensure the portfolio belongs to the logged-in user
    if (portfolio.portfolio_owner_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized action" });
    }

    // Update fields if provided
    portfolio.portfolio_name = portfolio_name || portfolio.portfolio_name;
    portfolio.portfolio_balance = portfolio_balance || portfolio.portfolio_balance;
    portfolio.investment_type = investment_type || portfolio.investment_type;

    const updatedPortfolio = await portfolio.save();
    res.status(200).json({ success: true, portfolio: updatedPortfolio });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Delete Portfolio
 * Deletes a portfolio from the database. Only the portfolio owner is allowed to delete it.
 */
exports.deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    // Ensure the portfolio belongs to the logged-in user
    if (portfolio.portfolio_owner_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized action" });
    }

    await portfolio.deleteOne();
    res.status(200).json({ success: true, message: "Portfolio deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
