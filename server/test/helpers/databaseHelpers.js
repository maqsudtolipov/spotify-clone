const mongoose = require("mongoose");
const File = require("../../src/models/fileModel");
const User = require("../../src/models/userModel");
const Song = require("../../src/models/songModel");
const RefreshToken = require("../../src/models/refreshTokenModel");
const InvalidAccessToken = require("../../src/models/invalidAccessTokenModel");
const Playlist = require("../../src/models/playlistModel");
const { MongoMemoryServer } = require("mongodb-memory-server");

exports.connectToDatabase = async () => {
  // Create memory db
  const memoryDB = await MongoMemoryServer.create();
  const dbUrl = memoryDB.getUri();

  // Set env files for test environment
  process.env.NODE_ENV = "production";
  process.env.IK_ENV = "test";

  try {
    await mongoose.connect(dbUrl);
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
