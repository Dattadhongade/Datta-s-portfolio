const mongoose = require('mongoose');

const portfolioStateSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      default: 1,
      unique: true
    },
    state_data: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('PortfolioState', portfolioStateSchema);
