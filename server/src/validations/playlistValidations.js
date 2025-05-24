const Joi = require("joi");
const { objectIdValidator } = require("./helperValidations");

const getPlaylistParamSchema = Joi.object({
  id: Joi.string().custom(objectIdValidator, "ObjectId validation").required(),
});

const createPlaylistSchema = Joi.object({
  name: Joi.string().min(3).max(24).default("Your Playlist"),
});

module.exports = { getPlaylistParamSchema, createPlaylistSchema };
