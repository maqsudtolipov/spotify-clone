const mongoose = require("mongoose");

const playCountSchema = new mongoose.Schema(
  {
    totalPlays: {
      type: Number,
      default: 0,
    },
    dailyPlays: [
      {
        date: Date,
        count: Number,
      },
    ],
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const PlayCount = new mongoose.model("PlayCount", playCountSchema);

module.exports = PlayCount;
