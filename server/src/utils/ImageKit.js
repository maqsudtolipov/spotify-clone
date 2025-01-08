const ImageKit = require("imagekit");

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const imagekit = new ImageKit({
  publicKey: process.env.IK_PUBLIC,
  privateKey: process.env.IK_PRIVATE,
  urlEndpoint: process.env.IK_URL,
});

module.exports = imagekit;