const AppError = require("../utils/AppError");

const handleValidationError = (error) => {
  return new AppError(error.message, 400);
};

const handleSyntaxError = () => {
  return new AppError("Invalid JSON format in request body", 400);
};

const handleDuplicationError = () => {
  return new AppError("The provided data already exists in the database.", 409);
};

const handleCastError = (error) => {
  return new AppError(`Invalid ${error.path}: ${error.value}`, 400);
};

const productionError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

const developmentError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    developmentError(err, res);
  }

  if (process.env.NODE_ENV === "production") {
    let error = Object.assign(err);

    if (error.name === "ValidationError") error = handleValidationError(error);
    if (error instanceof SyntaxError) error = handleSyntaxError(error);
    if (error.code === 11000) error = handleDuplicationError(error);
    if (error.name === "CastError") error = handleCastError(error);

    productionError(error, res);
  }
};
