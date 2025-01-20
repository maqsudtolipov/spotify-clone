const multer = require("multer");
const sharp = require("sharp");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else if (file.mimetype.split("/")[0] === "audio") {
    cb(null, true);
  } else {
    cb(new Error("Only images and songs are allowed!"));
  }
};

const upload = multer({ storage, fileFilter });

exports.uploadSongFiles = upload.fields([
  {
    name: "song",
    maxCount: 1,
  },
  {
    name: "img",
    maxCount: 1,
  },
]);

exports.processSongImg = async (req, res, next) => {
  try {
    if (!req.files.img) return next();

    req.files.img[0].filename = `img-${req.user.id}-${Date.now()}.jpeg`;

    req.files.img[0].buffer = await sharp(req.files.img[0].buffer)
      .resize(512, 512)
      .toFormat("jpeg")
      .toBuffer();

    next();
  } catch (e) {
    next(e);
  }
};

exports.processSongFile = async (req, res, next) => {
  try {
    if (!req.files.song) return next();

    req.files.song[0].filename = `song-${req.user.id}-${Date.now()}.mp3`;

    next();
  } catch (e) {
    next(e);
  }
};
