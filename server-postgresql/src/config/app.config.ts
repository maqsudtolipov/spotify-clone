import express from "express";
import authRoutes from "../routes/authRoutes";
import globalErrorHandler from "../errors/globalErrorHandler";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);

app.use(globalErrorHandler);

export default app;
