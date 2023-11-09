const express = require("express")
const routes = express.Router()
const traningDetailControllers = require('../controllers/traningDetailControllers')
// const upload = require("../middleware/upload")

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: 'djm1ypup6', 
    api_key: '529691389421225', 
    api_secret: 'vJVktHIP6FM9OXlCZ7ENJEHfKmE'
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'Binar',
      formats: 'mp4',
      resource_type: 'video'
    }
  });
  
const upload = multer({ storage: storage });
  // const upload = multer();

  // const storage = new Multer.memoryStorage();

routes.get('/', traningDetailControllers.getAllDataDetail)
routes.get('/:id', traningDetailControllers.getById)
routes.get('/one/:id', traningDetailControllers.getOneId)
routes.post('/detail/create', upload.single('vidio'), traningDetailControllers.create)
routes.put('/detail/edit/:id', upload.single('vidio'),  traningDetailControllers.edit)
routes.delete('/delete/:id', traningDetailControllers.delete)

module.exports = routes
