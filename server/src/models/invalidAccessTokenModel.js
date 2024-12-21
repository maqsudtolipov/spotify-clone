const mongoose = require("mongoose");

const invalidAccessTokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: [true, "Please provide a token"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a user ID"],
  },
  expiresAt: {
    type: Date,
    required: [true, "Please provide an expiration date"],
  },
});

const InvalidAccessToken = mongoose.model(
  "InvalidAccessToken",
  invalidAccessTokenSchema,
);
module.exports = InvalidAccessToken;
