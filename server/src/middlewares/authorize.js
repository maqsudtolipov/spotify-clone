const authorize =
  (roles = []) =>
  async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
