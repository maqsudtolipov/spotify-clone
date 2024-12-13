const express = require("express");
const dotenv = require("dotenv");

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

module.exports = app;
