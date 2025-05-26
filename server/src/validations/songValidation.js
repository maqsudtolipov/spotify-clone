const Joi = require("joi");
const { objectIdValidator } = require("./validationHelpers");

const uploadSongSchema = Joi.object({
  name: Joi.string().min(3).max(24).required(),
});

const updateSongParamsSchema = Joi.object({
  id: Joi.string().custom(objectIdValidator, "ObjectId validation").required(),
});

const deleteSongParamsSchema = Joi.object({
  id: Joi.string().custom(objectIdValidator, "ObjectId validation").required(),
});

const likeSongParamsSchema = Joi.object({
  id: Joi.string().custom(objectIdValidator, "ObjectId validation").required(),
});

const dislikeSongParamsSchema = Joi.object({
  id: Joi.string().custom(objectIdValidator, "ObjectId validation").required(),
});

const addSongToPlaylistParamsSchema = Joi.object({
  songId: Joi.string()
    .custom(objectIdValidator, "ObjectId validation")
    .required(),
  playlistId: Joi.string()
    .custom(objectIdValidator, "ObjectId validation")
    .required(),
});

const removeSongFromPlaylistParamsSchema = Joi.object({
  songId: Joi.string()
    .custom(objectIdValidator, "ObjectId validation")
    .required(),
  playlistId: Joi.string()
    .custom(objectIdValidator, "ObjectId validation")
    .required(),
});

const playParamsSchema = Joi.object({
  id: Joi.string().custom(objectIdValidator, "ObjectId validation").required(),
});

module.exports = {
  uploadSongSchema,
  updateSongParamsSchema,
  deleteSongParamsSchema,
  likeSongParamsSchema,
  dislikeSongParamsSchema,
  addSongToPlaylistParamsSchema,
  removeSongFromPlaylistParamsSchema,
  playParamsSchema,
};
