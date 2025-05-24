const Joi = require("joi");

const signUpSchema = Joi.object({
  name: Joi.string().min(3).max(24).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(16)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
      ),
    )
    .required(),
  passwordConfirm: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .messages({ "any.only": "Passwords must match" }),
  isArtist: Joi.boolean().optional(),
});

module.exports = {
  signUpSchema,
};
