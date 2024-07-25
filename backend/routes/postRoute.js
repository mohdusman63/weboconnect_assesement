const express = require('express');
const router = express.Router();
const postController = require('../controller/postController')
const { postValidationRules,validate } = require('../validator/validation');
const multer = require('multer');
const path=require('path');
const jwtVerify = require('../middleware/jwtVerify');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null,'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({ storage });

router.post('/api/v1/post',jwtVerify,upload.single('image'), postController.createPost)

router.get('/api/v1/post',jwtVerify, postController.getAllPost)



module.exports = router