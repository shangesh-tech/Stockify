const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const {
  createPortfolio,
  getPortfolioById,
  getAllPortfoliosByUser,
  updatePortfolio,
  deletePortfolio,
} = require("../controllers/portfolioController");

// Create a new portfolio
router.post("/create", isAuthenticatedUser, createPortfolio);

router.get("/user/all", isAuthenticatedUser, getAllPortfoliosByUser);

// Get a specific portfolio by ID (must be after "/user/all")
router.get("/:id", isAuthenticatedUser, getPortfolioById);

// Update an existing portfolio
router.put("/:id", isAuthenticatedUser, updatePortfolio);

// Delete a portfolio
router.delete("/:id", isAuthenticatedUser, deletePortfolio);

module.exports = router;
