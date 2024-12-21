const User = require("../models/userModel");

const authorize =
  (roles = []) =>
  async (req, res, next) => {
    const user = await User.findById(req.user.id, 'id name email role');

    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };

module.exports = authorize;
