const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Middleware to Check if the User is Authenticated
exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    const { 'stockify-token': token } = req.cookies;  // Ensure cookie-parser is being used
    
    // Check if token is present
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "Please Login to Access" 
      });
    }

    // Verify token
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID stored in the token payload
    req.user = await User.findById(decodedData.id);

    // If user not found
    if (!req.user) {
      return res.status(401).json({
        success: false, 
        message: "User not found"
      });
    }
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired, please login again"
      });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token, please login again"
      });
    } else {
      // For any other errors
      return res.status(500).json({ 
        success: false, 
        message: error.message 
      });
    }
  }
};
