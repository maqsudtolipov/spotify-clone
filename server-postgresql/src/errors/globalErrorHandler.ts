import { Request, Response, NextFunction } from "express";

interface ErrorType extends Error {
  statusCode: number;
  status: "fail" | "error";
  isOperational: boolean;
  code?: string;
}

const globalErrorHandler = (
  err: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
};

export default globalErrorHandler;
