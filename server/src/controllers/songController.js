exports.uploadSong = async (req, res, next) => {
  try {
    console.log(req.files);

    res.status(201).json({
      status: "success",
    });
  } catch (e) {
    next(e);
  }
};
