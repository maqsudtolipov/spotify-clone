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

exports.uploadPlaylistFiles = upload.fields([
  {
    name: "img",
    maxCount: 1,
  },
]);

exports.processPlaylistImg = async (req, res, next) => {
  try {
    if (!req.files?.img) return next();

    // Filename
    req.files.img[0].filename = `img-${req.user.id}-${Date.now()}.jpeg`;

    // Resize
    req.files.img[0].buffer = await sharp(req.files.img[0].buffer)
      .resize(512, 512)
      .toFormat("jpeg")
      .toBuffer();

    next();
  } catch (e) {
    next(e);
  }
};
