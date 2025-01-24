const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  fileId: {
    type: String,
    required: [true, "Please provide file id"],
  },
  fileName: {
    type: String,
    required: [true, "Please provide file name"],
  },
  filePath: {
    type: String,
    required: [true, "Please provide file path"],
  },
  url: {
    type: String,
    required: [true, "Please provide file url"],
  },
  size: {
    type: Number,
    required: [true, "Please provide file size"],
  },
});

const File = new mongoose.model("File", fileSchema);

module.exports = File;
