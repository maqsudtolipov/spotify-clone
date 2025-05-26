const AppError = require("./AppError");

const validateInput = (schema, data) => {
  const { error, value } = schema.validate(data, { abortEarly: false });

  if (error) {
    const messages = error.details
      .map((d) => d.message.replace(/"/g, ""))
      .join(", ");

    throw new AppError(`Validation error: ${messages}`, 422);
  }

  return value;
};

module.exports = validateInput;
