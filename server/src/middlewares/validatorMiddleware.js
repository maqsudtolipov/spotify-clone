const validateInput = require("../utils/validateInput");

const validatorMiddleware =
  (schema, source = "body") =>
  (req, res, next) => {
    try {
      req[source] = validateInput(schema, req[source]);
      next();
    } catch (err) {
      next(err);
    }
  };

module.exports = validatorMiddleware;
