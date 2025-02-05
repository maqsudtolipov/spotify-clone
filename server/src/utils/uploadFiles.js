const {imagekitUpload, imagekitDelete} = require("./ImageKit");
const File = require("../models/fileModel");
/**
 * Uploads an image file to ImageKit and stored file information inside the database
 *
 * @param file
 * @param fileName
 * @param folder
 * @param isDefault - CRITICAL: if false it deletes the file
 * @param imagekitId
 * @param databaseId
 * @returns {Promise<*>}
 */
const uploadFiles = async (
  {file, fileName, folder},
  isDefault,
  imagekitId,
  databaseId,
) => {
  if (!file || !fileName || !folder) {
    console.error("Missing required file fields");
  }

  const imgUpload = await imagekitUpload({
    file,
    fileName,
    folder,
  });
  const imgFile = await File.create(imgUpload);

  if (!isDefault) {
    if (!imagekitId || !databaseId) {
      console.error("Missing fields for file deletion");
    }

    await imagekitDelete(imagekitId);
    await File.findByIdAndDelete(databaseId);
  }

  return imgFile;
};

module.exports = uploadFiles;
