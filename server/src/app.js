const express = require("express");
const dotenv = require("dotenv");

const globalErrorHandler = require("./middleware/errorMiddleware");
const authRouter = require("./feature/auth/authRoutes");

// Express App setup
const app = express();

// Env
dotenv.config({ path: "./.env" });

// Middlewares
app.use(express.json());

app.use("/api/auth", authRouter);

// Error handling middleware
app.use(globalErrorHandler);

module.exports = app;
