const mongoose = require("mongoose");
const User = require("../../src/models/userModel");
const Song = require("../../src/models/songModel");
const RefreshToken = require("../../src/models/refreshTokenModel");
const InvalidAccessToken = require("../../src/models/invalidAccessTokenModel");
const Playlist = require("../../src/models/playlistModel");

exports.connectToDatabase = async () => {
  if (
    !process.env.DB_TEST_URL &&
    !/test-database/.test(process.env.DB_TEST_URL)
  ) {
    console.log("Tests can only and must connect to a test database.");
  }

  const DB = process.env.DB_TEST_URL.replace(
    "<db_password>",
    process.env.DB_PASS,
  );
  await mongoose.connect(DB);
};

exports.cleanupDatabaseAndDisconnect = async () => {
  await User.deleteMany();
  await Song.deleteMany();
  await Playlist.deleteMany();
  await RefreshToken.deleteMany();
  await InvalidAccessToken.deleteMany();
  await mongoose.disconnect();
};
