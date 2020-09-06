const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// config using heroku cloudinary accout url
// cloudinary.config({
//   CLOUDINARY_URL: process.env.CLOUDINARY_URL
// })

// heroku config vars are lowercase!
// cloudinary.config({
//   cloud_name: process.env.cloud_name,
//   api_key: process.env.api_key,
//   api_secret: process.env.api_secret
// });

// // local config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "works",
    allowedFormats: ["jpg", "png"],
    // transformation: [{ width: 500, height: 500, crop= "limit"}]
    // public_id: (req, file) => 'computed-filename-using-request'
  }
});

// possibly make new storage instance exported under separate multer call for avatar images

const imgUpload = multer({ storage: storage });

module.exports = imgUpload;
