const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary')

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Events',
    allowedFormats: ['jpg', 'png', 'gif', 'jpeg', 'webp']
  }
});

const upload = multer({ storage });
module.exports = upload;