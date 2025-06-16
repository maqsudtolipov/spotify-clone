import Joi from "joi";

export const signUpSchema = Joi.object({
  name: Joi.string().min(3).max(24).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(16)
    .pattern(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&^#()\-_=+]{8,16}$/,
      "password",
    )
    .required()
    .messages({
      "string.pattern.name":
        "Password must contain at least one letter and one number",
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password must not exceed 16 characters",
    }),
  passwordConfirm: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .messages({ "any.only": "Passwords must match" }),
  isArtist: Joi.boolean().optional(),
});
