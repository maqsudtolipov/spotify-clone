const mongoose = require("mongoose");
const File = require("../../src/models/fileModel");
const User = require("../../src/models/userModel");
const Song = require("../../src/models/songModel");
const RefreshToken = require("../../src/models/refreshTokenModel");
const InvalidAccessToken = require("../../src/models/invalidAccessTokenModel");
const Playlist = require("../../src/models/playlistModel");

exports.connectToDatabase = async () => {
  // Set env files for test environment
  process.env.NODE_ENV = "production";
  process.env.IK_ENV = "test";

  const dbUrl = process.env.DB_TEST_URL;

  if (!dbUrl && !/test-database/.test(dbUrl)) {
    console.log("Tests can only and must connect to a test database.");
    process.exit(1);
  }

  try {
    const DB = dbUrl.replace("<db_password>", process.env.DB_PASS);
    await mongoose.connect(DB);
    console.log("🟢 Test Database Connected");
  } catch (err) {
    console.error("🔴 DATABASE CONNECTION ERROR: ", err);
    throw new Error("Database connection failed.");
  }
};

exports.cleanupDatabaseAndDisconnect = async () => {
  try {
    await File.deleteMany();
    await User.deleteMany();
    await Song.deleteMany();
    await Playlist.deleteMany();
    await RefreshToken.deleteMany();
    await InvalidAccessToken.deleteMany();
    console.log("🧹 Database cleaned up");
  } catch (e) {
    console.error("🔴 ERROR during database cleanup");
  } finally {
    await mongoose.disconnect();
    console.log("🟢 Database disconnected");
  }
};
