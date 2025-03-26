const dotenv = require("dotenv");
const app = require("./src/config/app.config");
const checkEnvVariables = require("./src/config/env.config");
const connectDB = require("./src/config/db.config");
const cron = require("node-cron");
const cleanupTokens = require("./src/cron/tokensCleanup");

// Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log("🔴 UNCAUGHT EXCEPTION: ", err.name, err.message, err);
  process.exit(1);
});

// DotENV
dotenv.config();
checkEnvVariables();

// Connect to mongoDb
connectDB();

// Server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(`🟢 Server running on port ${PORT}`),
);

// Uncaught Rejection
process.on("unhandledRejection", (err) => {
  console.log("🔴 UNHANDLED REJECTION: ", err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Cron jobs
cron.schedule("0 */6 * * *", cleanupTokens);
