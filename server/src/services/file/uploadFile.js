const File = require("../../models/fileModel");
const { imagekitUpload, imagekitDelete } = require("../../utils/ImageKit");

const uploadFile = async (fileId, fileData, folder) => {
  // Check credentials
  if (!fileId || !fileData) {
    console.log("Please provide all data for file upload");
    return null;
  }

  // Fetch file from DB
  const originalFile = await File.findById(fileId).select("+isDefault");

  // Upload file to media storage
  const uploadedFile = await imagekitUpload({
    file: fileData.buffer,
    fileName: fileData.filename,
    folder,
  });

  // Create a file in a database
  const newFile = await File.create(uploadedFile);

  // Delete an old file from DB and storage, if not the default one
  if (!originalFile.isDefault && originalFile.id && originalFile.fileId) {
    await imagekitDelete(originalFile.fileId);
    await File.findByIdAndDelete(originalFile.id);
  } else if (!originalFile.isDefault) {
    console.error("Missing fields for file deletion");
  }

  return newFile.id;
};

module.exports = uploadFile;
