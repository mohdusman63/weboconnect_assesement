const express = require('express');
const router = express.Router();
const Utill = require('../utill/helper');
const authController = require('../controller/authController')
const { registerValidationRules, validate, loginValidationRules} = require('../validator/validation');



router.post('/api/v1/register',registerValidationRules(), validate, authController.register)

router.post('/api/v1/login',loginValidationRules(), validate, authController.login)

module.exports = router