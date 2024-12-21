class AppError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    if (code) this.code = code;
    Error.captureStackTrace(this, AppError);
  }
}

module.exports = AppError;
