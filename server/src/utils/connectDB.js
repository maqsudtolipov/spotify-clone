const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const DB = process.env.DB_URL.replace("<db_password>", process.env.DB_PASS);
    await mongoose.connect(DB);
    console.log(`🟢 DATABASE CONNECTED`);
  } catch (err) {
    console.error("🔴 DATABASE CONNECTION ERROR: ", err);
    process.exit(1);
  }
};

module.exports = connectDB;
