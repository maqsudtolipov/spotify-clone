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
      code: err.code,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

const developmentError = (prodError, devError, res) => {
  res.status(prodError.statusCode).json({
    status: prodError.status,
    message: prodError.message,
    code: prodError.code,
    dev: {
      status: devError.status,
      message: devError.message,
      error: devError,
      stack: devError.stack,
    },
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let prodErr = Object.assign(err);

  if (prodErr.name === "ValidationError")
    prodErr = handleValidationError(prodErr);
  if (prodErr instanceof SyntaxError) prodErr = handleSyntaxError(prodErr);
  if (prodErr.code === 11000) prodErr = handleDuplicationError(prodErr);
  if (prodErr.name === "CastError") prodErr = handleCastError(prodErr);

  if (process.env.NODE_ENV === "development") {
    developmentError(prodErr, err, res);
  } else if (process.env.NODE_ENV === "production") {
    productionError(prodErr, res);
  }
};
