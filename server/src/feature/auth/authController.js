const bcrypt = require("bcryptjs");
const User = require("./userModel");
const AppError = require("../../utils/AppError");

exports.signUp = async (req, res, next) => {
  try {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    };

    const newUser = await User.create(userData);

    res.status(201).json({ status: "success", data: newUser });
  } catch (e) {
    next(e);
  }
};

exports.login = async (req, res, next) => {
  try {
    // Validate email and password
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Please provide email and password", 422));
    }

    // Check if user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new AppError("Invalid email or password", 401));
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new AppError("Invalid email or password", 401));
    }

    res.status(200).json({
      status: "success",
      user: {
        id: user._id,
        name: user.name,
      },
    });
  } catch (e) {
    next(e);
  }
};
