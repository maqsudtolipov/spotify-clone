exports.me = async (req, res, next) => {
  try {
    // const user = await User.findById(req.user.id);

    res.status(200).json({ status: "success" });
  } catch (e) {
    next(e);
  }
};
