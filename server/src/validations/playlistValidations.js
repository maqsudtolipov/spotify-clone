const Joi = require("joi");
const { objectIdValidator } = require("./validationHelpers");

// Get playlist
const getPlaylistParamSchema = Joi.object({
  id: Joi.string().custom(objectIdValidator, "ObjectId validation").required(),
});

// Create playlist
const createPlaylistSchema = Joi.object({
  name: Joi.string().min(3).max(24).default("Your Playlist"),
});

// Update playlist
const updatePlaylistParamSchema = Joi.object({
  id: Joi.string().custom(objectIdValidator, "ObjectId validation").required(),
});

const updatePlaylistSchema = Joi.object({
  name: Joi.string().min(3).max(24).empty("").optional(),
  description: Joi.string().max(120).allow("").optional(),
  isPublic: Joi.boolean().optional(),
  imgFile: Joi.any().optional(),
});

// Delete playlist
const deletePlaylistParamSchema = Joi.object({
  id: Joi.string().custom(objectIdValidator, "ObjectId validation").required(),
});

// Save playlist
const savePlaylistSchema = Joi.object({
  id: Joi.string().custom(objectIdValidator, "ObjectId validation").required(),
});

// Remove playlist
const removePlaylistSchema = Joi.object({
  id: Joi.string().custom(objectIdValidator, "ObjectId validation").required(),
});

module.exports = {
  getPlaylistParamSchema,
  createPlaylistSchema,
  updatePlaylistParamSchema,
  updatePlaylistSchema,
  deletePlaylistParamSchema,
  savePlaylistSchema,
  removePlaylistSchema,
};
