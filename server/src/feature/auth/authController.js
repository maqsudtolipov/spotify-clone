const User = require("./userModel");

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
    res
      .status(200)
      .json({ status: "success", message: "Logged in successfully" });
  } catch (e) {
    next(e);
  }
};
