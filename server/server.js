const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./src/app");

// DotENV
dotenv.config({ path: "./.env" });

// Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log("🔴 Uncaught Exception: ", err.name, err.message, err);
  console.log("🔴 Closing server now...");
  process.exit(1);
});

// Connect to mongoDb
const DB = process.env.DB_URL.replace("<db_password>", process.env.DB_PASS).replace("<db_name>", process.env.DB_NAME);
mongoose.connect(DB).then(() => {
  console.log(`🟢 DATABASE CONNECTED`);
});

// Server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(`🟡 Server running on port ${PORT}`),
);

// Uncaught Rejection
process.on("unhandledRejection", (err) => {
  console.log("🔴 UNHANDLED REJECTION: ", err.name, err.message);
  console.log("🔴 Closing server now...");
  server.close(() => {
    process.exit(1);
  });
});
