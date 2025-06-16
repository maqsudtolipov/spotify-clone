import { Request, Response, NextFunction } from "express";

interface ResError extends Error {
  statusCode: number;
  status: "fail" | "error";
  isOperational: boolean;
  code?: string;
}

const productionError = (resError: ResError, res: Response) => {
  if (resError.isOperational) {
    res.status(resError.statusCode).json({
      status: resError.status,
      message: resError.message,
      code: resError.code,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

const developmentError = (
  resError: ResError,
  devError: Error,
  res: Response,
) => {
  res.status(resError.statusCode).json({
    status: resError.status,
    message: resError.message,
    code: resError.code,
    dev: {
      message: devError.message,
      error: devError,
      stack: devError.stack,
    },
  });
};

const globalErrorHandler = (
  err: ResError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  const resError = Object.assign(err);

  if (process.env.NODE_ENV === "development") {
    developmentError(resError, err, res);
  } else if (process.env.NODE_ENV === "production") {
    productionError(resError, res);
  }
};

export default globalErrorHandler;
