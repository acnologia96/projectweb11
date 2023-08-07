const express = require("express");
const router = express.Router();
//controllers
const {createImage,removeImage} =require('../controllers/cloudinary')
//midlleware
const {auth,adminCheck}=require('../middleware/auth')


router.post('/images',auth,adminCheck,createImage)
router.post('/removeimages',auth,adminCheck,removeImage)


module.exports = router;