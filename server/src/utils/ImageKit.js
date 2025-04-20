const ImageKit = require("imagekit");

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const imagekit = new ImageKit({
  publicKey: process.env.IK_PUBLIC,
  privateKey: process.env.IK_PRIVATE,
  urlEndpoint: process.env.IK_URL,
});

exports.imagekitUpload = (input) => {
  const folder = process.env.IK_ENV === "production" ? "spotify/" : "spotify-dev/";

  return imagekit.upload({
    file: input.file,
    fileName: input.fileName,
    folder: folder + input.folder,
  });
};

exports.imagekitDelete = (fileId) => {
  return imagekit.deleteFile(fileId, function (error, result) {
    if (error) console.log(error);
    else console.log(result);
  });
};
