const mongoose = require("mongoose");

const dbConfig = async () => {
  try {
    const env = process.env.NODE_ENV || "development";
    const DB_URL = {
      production: process.env.MONGO_URI_PROD,
      development: process.env.MONGO_URI_DEV,
      test: process.env.MONGO_URI_TEST,
    }[env];

    if (!DB_URL) {
      console.log(`🟠 No MongoDB URI found for environment: ${env}`);
    }

    await mongoose.connect(DB_URL);

    console.log(`🟢 DATABASE CONNECTED to ${env} database`);
  } catch (err) {
    console.error("🔴 DATABASE CONNECTION ERROR: ", err);
    process.exit(1);
  }
};

module.exports = dbConfig;
