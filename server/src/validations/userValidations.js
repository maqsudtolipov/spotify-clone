const Joi = require("joi");
const { objectIdValidator } = require("./validationHelpers");

const getUserByIdSchema = Joi.object({
  id: Joi.string().custom(objectIdValidator, "ObjectId validation").required(),
});

const updateMeSchema = Joi.object({
  name: Joi.string().min(3).max(24).optional(),
});

const followUserSchema = Joi.object({
  id: Joi.string().custom(objectIdValidator, "ObjectId validation").required(),
});

const unfollowUserSchema = Joi.object({
  id: Joi.string().custom(objectIdValidator, "ObjectId validation").required(),
});

module.exports = {
  getUserByIdSchema,
  updateMeSchema,
  followUserSchema,
  unfollowUserSchema,
};
