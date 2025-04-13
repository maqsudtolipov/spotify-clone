const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

const globalErrorHandler = require("../middlewares/errorMiddleware");
const authRouter = require("../routes/authRoutes");
const userRouter = require("../routes/userRoutes");
const artistRouter = require("../routes/artistRoutes");
const songRouter = require("../routes/songRoutes");
const playlistRouter = require("../routes/playlistRoutes");
const searchRouter = require("../routes/searchRoutes");

const appConfig = express();

// Middlewares
appConfig.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
appConfig.use(express.json());
appConfig.use(express.urlencoded({ extended: true }));
appConfig.use(cookieParser());
appConfig.use(morgan("tiny"));

// Routes
appConfig.use("/api/auth", authRouter);
appConfig.use("/api/users", userRouter);
appConfig.use("/api/artists", artistRouter);
appConfig.use("/api/songs", songRouter);
appConfig.use("/api/playlists", playlistRouter);
appConfig.use("/api/search", searchRouter);

// Error handling middleware
appConfig.use(globalErrorHandler);

module.exports = appConfig;
