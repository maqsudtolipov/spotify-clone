const ImageKit = require("imagekit");

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const imagekit = new ImageKit({
  publicKey: process.env.IK_PUBLIC,
  privateKey: process.env.IK_PRIVATE,
  urlEndpoint: process.env.IK_URL,
});

exports.imagekitUpload = (input) => {
  const folder = process.env.IK_ENV === "test" ? "test-spotify/" : "spotify/";

  return imagekit.upload({
    file: input.file,
    fileName: input.fileName,
    folder: folder + input.folder,
  });
};
