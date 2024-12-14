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

// Routes
app.get("/greet", (req, res) => {
  const name = req.query.name || "World";
  res.json({ message: `Hello, ${name}!` });
});

app.use("/api/auth", authRouter);

// Error handling middleware
app.use(globalErrorHandler);

module.exports = app;
