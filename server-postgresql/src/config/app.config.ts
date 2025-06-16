import express from "express";
import authRoutes from "../routes/authRoutes";
import globalErrorHandler from "../errors/globalErrorHandler";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);

app.use(globalErrorHandler);

export default app;
