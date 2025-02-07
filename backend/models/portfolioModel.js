const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    portfolio_owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    portfolio_name: {
      type: String,
      required: true,
      maxLength: 25,
    },
    portfolio_balance: {
      type: Number,
      required: true,
    },
    investment_type: {
      type: String,
      required: true,
      enum: ["sip", "lumpsum"],
    },
    user_info: [
      {
        Experience: {
          type: String,
          enum: ["Beginner", "Intermediate", "Advanced"],
          required: true,
        },
        risk: {
          type: String,
          enum: ["Low", "Conservative", "High"],
          required: true,
        }
      },
    ],
    portfolio_data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);
