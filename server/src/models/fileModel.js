const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    fileId: {
      type: String,
      required: [true, "Please provide file id"],
    },
    name: {
      type: String,
      required: [true, "Please provide file name"],
    },
    size: {
      type: Number,
      required: [true, "Please provide file size"],
    },
    filePath: {
      type: String,
      required: [true, "Please provide file path"],
    },
    url: {
      type: String,
      required: [true, "Please provide file url"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

const File = mongoose.model("File", fileSchema);

module.exports = File;
