const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });
cloudinary.config({ 
    cloud_name: 'djm1ypup6', 
    api_key: '529691389421225', 
    api_secret: process.env.CLOUDINARY_SECRET
  });

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Binar',
   
    }
})
  
  const upload = multer({ storage: storage })

module.exports = upload