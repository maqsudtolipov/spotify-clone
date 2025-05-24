const Joi = require("joi");
const { objectIdValidator } = require("./helperValidations");

const getPlaylistParamSchema = Joi.object({
  id: Joi.string().custom(objectIdValidator, "ObjectId validation").required(),
});

module.exports = { getPlaylistParamSchema };
