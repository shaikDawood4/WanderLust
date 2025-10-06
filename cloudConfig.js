const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
   cloud_name : process.env.CLOUDE_NAME,
   api_key : process.env.CLOUD_API_KEY,
   api_secret : process.env.CLOUD_API_SECRET
}) // in config ({}) we pass config details. 


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_DEV', // naming folder and using for dev
    allowedFormats: ["png","jpg","jpeg"] // we are allowing these formats
    
  },
});
 

module.exports = {
    cloudinary,
    storage // we are basically exporting 2 things 
}