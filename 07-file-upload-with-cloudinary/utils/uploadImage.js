import cloudinary from 'cloudinary'
import dotenv from 'dotenv';

dotenv.config();
const cloudinaryV2 = cloudinary.v2

cloudinaryV2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

function uploadImage(path) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { width: 500, height: 500, crop: "fill" },
      (err, res) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
}

module.exports = { uploadImage };