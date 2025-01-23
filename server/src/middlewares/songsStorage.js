const multer = require("multer");
const sharp = require("sharp");
const mp3Duration = require("mp3-duration");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else if (file.mimetype === "audio/mpeg") {
    cb(null, true);
  } else {
    cb(new Error("Only images and MP3 audio files are allowed!"));
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

    // Filename
    req.files.img[0].filename = `img-${req.user.id}}.jpeg`;

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

exports.processSongFile = async (req, res, next) => {
  try {
    if (!req.files.song) return next();

    // Duration
    mp3Duration(req.files.song[0].buffer, function (err, duration) {
      if (err) return console.log(err.message);
      req.files.song[0].duration = Math.round(duration);
    });

    // Filename
    req.files.song[0].filename = `song-${req.user.id}}.mp3`;

    next();
  } catch (e) {
    next(e);
  }
};
