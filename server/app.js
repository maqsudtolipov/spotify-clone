const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Express App setup
const app = express();

// Env
dotenv.config({ path: "./.env" });

// Middlewares
app.use(express.json());

module.exports = app;