const Joi = require("joi");
const { objectIdValidator } = require("./validationHelpers");

const getArtistParamSchema = Joi.object({
  id: Joi.string().custom(objectIdValidator, "ObjectId validation").required(),
});

module.exports = { getArtistParamSchema };
