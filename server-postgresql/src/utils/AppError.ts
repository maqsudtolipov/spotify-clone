export class AppError extends Error {
  statusCode: number;
  status: "fail" | "error";
  isOperational: boolean;
  code?: string;

  constructor(message: string, statusCode: number, code?: string) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    if (code) this.code = code;

    Error.captureStackTrace(this, this.constructor);
  }
}
