const Joi = require("joi");

const searchQuerySchema = Joi.object({
  name: Joi.string().trim().min(1).optional(),
  limit: Joi.number().integer().positive().optional().default(10),
  page: Joi.number().integer().positive().optional().default(1),
});

module.exports = {
  searchQuerySchema,
};
