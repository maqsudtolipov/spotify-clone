const User = require("../models/userModel");
const AppError = require("../utils/AppError");

exports.signUp = async function (signUpInput) {
  // Check if the user already exists
  const existingUser = await User.findOne({ email: signUpInput.email });
  if (existingUser) {
    throw new AppError("Email already exists", 409);
  }

  const userInput = {
    ...signUpInput,
    img: await User.getDefaultUserImgId(),
  };

  return User.create(userInput);
};
