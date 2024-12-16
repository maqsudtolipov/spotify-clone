const mongoose = require("mongoose");

const accessTokenSchema = mongoose.Schema({
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

const AccessToken = mongoose.model("AccessToken", accessTokenSchema);
module.exports = AccessToken;