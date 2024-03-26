const cloudinary = require('cloudinary').v2;
const deleteFile = (imgUrl) => {

  const imgSplited = imgUrl.split('/');
  const folderSplited = imgSplited.at(-2);
  const nameSplited = imgSplited.at(-1).split(".")[0];


  cloudinary.uploader.destroy(`${folderSplited}/${nameSplited}`, () => {
    console.log("Imagen borrada de cloudinary");
  })
};
module.exports = { deleteFile }
