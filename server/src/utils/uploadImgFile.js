const {imagekitUpload, imagekitDelete} = require("./ImageKit");
/**
 * Uploads an image file to ImageKit and stored file information inside the database
 *
 * @param imgBuffer
 * @param imgFilename
 * @param folder
 * @param isDefault
 * @param imagekitId
 * @param databaseId
 * @returns {Promise<*>}
 */
const uploadImgFile = async (
  {imgBuffer, imgFilename, folder},
  isDefault,
  imagekitId,
  databaseId,
) => {
  if (!imgBuffer || !imgFilename || !folder) {
    console.error("Missing required file fields");
  }

  const imgUpload = await imagekitUpload({
    file: imgBuffer,
    fileName: imgFilename,
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

module.exports = uploadImgFile;
