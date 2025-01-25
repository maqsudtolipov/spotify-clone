const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

const globalErrorHandler = require("./middlewares/errorMiddleware");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const artistRouter = require("./routes/artistRoutes");
const songRouter = require("./routes/songRoutes");
const playlistRouter = require("./routes/playlistRoutes");

// Express App setup
const app = express();

// Env
dotenv.config();

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/artists", artistRouter);
app.use("/api/songs", songRouter);
app.use("/api/playlists", playlistRouter);

// Error handling middlewares
app.use(globalErrorHandler);

module.exports = app;
