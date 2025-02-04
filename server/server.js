const dotenv = require("dotenv");
const app = require("./src/app");
const checkEnvVariables = require("./src/utils/ checkEnvVariables");
const connectDB = require("./src/utils/connectDB");

// Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log("🔴 UNCAUGHT EXCEPTION: ", err.name, err.message, err);
  process.exit(1);
});

// DotENV
dotenv.config({ path: "./.env" });
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
