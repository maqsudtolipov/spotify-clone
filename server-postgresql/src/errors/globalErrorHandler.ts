import { Request, Response, NextFunction } from "express";

interface ResError extends Error {
  statusCode: number;
  status: "fail" | "error";
  isOperational: boolean;
  code?: string;
}

const sendError = (resError: ResError, devError: Error, res: Response) => {
  const isDev = process.env.NODE_ENV === "development";
  const isOperational = resError.isOperational;

  const baseResponse = {
    status: isOperational ? resError.status : "error",
    message: isOperational ? resError.message : "Something went wrong!",
    code: resError.code,
  };

  if (isDev) {
    Object.assign(baseResponse, {
      dev: {
        message: devError.message,
        error: devError,
        stack: devError.stack,
      },
    });
  }

  res.status(resError.statusCode).json(baseResponse);
};

const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const resError: ResError = {
    name: err.name,
    message: err.message,
    stack: err.stack,
    statusCode: (err as any).statusCode || 500,
    status: (err as any).status || "error",
    isOperational: (err as any).isOperational ?? false,
    code: (err as any).code,
  };

  sendError(resError, err, res);
};

export default globalErrorHandler;
