const multer = require("multer");
const sharp = require("sharp");
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"));
  }
};

const upload = multer({ storage, fileFilter });

exports.uploadUserImg = upload.single("img");

exports.resizeUserImg = async (req, res, next) => {
  try {
    if (!req.file) return next();

    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

    req.file.buffer = await sharp(req.file.buffer)
      .resize(512, 512)
      .toFormat("jpeg")
      .toBuffer();

    next();
  } catch (e) {
    next(e);
  }
};
