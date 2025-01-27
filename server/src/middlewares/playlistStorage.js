const multer = require("multer");

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
