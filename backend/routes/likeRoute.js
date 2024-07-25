const express = require('express');
const router = express.Router();
const likeController = require('../controller/likeController')
const { likeValidationRules, validate } = require('../validator/validation');
const jwtVerify = require('../middleware/jwtVerify');



router.post('/api/v1/like',jwtVerify,likeValidationRules(),validate, likeController.likePost)




module.exports = router