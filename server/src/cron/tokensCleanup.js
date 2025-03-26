const RefreshToken = require("../models/refreshTokenModel");
const InvalidAccessToken = require("../models/invalidAccessTokenModel");
const process = require("node:process");

const cleanupTokens = async () => {
  console.log("⚪️ Starting token cleanup");
  const now = new Date();

  try {
    // Delete expired refresh tokens (older than 7 days)
    await RefreshToken.deleteMany({
      createdAt: { $lt: new Date(now - process.env.REFRESH_TOKEN_EXPIRATION) },
    });

    // Delete expired access tokens (older than 15 minutes)
    await InvalidAccessToken.deleteMany({
      createdAt: { $lt: new Date(now - process.env.ACCESS_TOKEN_EXPIRATION) },
    });

    console.log("⚪️ Expired tokens cleaned up");
  } catch (e) {
    console.error("⬜️ Error cleaning up tokens: ", e);
  }
};

module.exports = cleanupTokens;
