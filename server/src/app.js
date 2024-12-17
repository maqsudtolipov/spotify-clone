const express = require("express");
const dotenv = require("dotenv");

const globalErrorHandler = require("./middleware/errorMiddleware");
const authRouter = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

// Express App setup
const app = express();

// Env
dotenv.config();

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

// Error handling middleware
app.use(globalErrorHandler);

module.exports = app;
