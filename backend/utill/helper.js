require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 10;


exports.hashPassword = (myPlaintextPassword) => {
    return bcrypt.hashSync(myPlaintextPassword, saltRounds);
  
  };
  
  exports.compareHashPassword = (myPlaintextPassword, hash) => {
    return bcrypt.compareSync(myPlaintextPassword, hash);
  };
  
  exports.generateToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_TIMEOUT_DURATION});
  };