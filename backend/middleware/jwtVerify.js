require('dotenv').config()
var jwt = require('jsonwebtoken');
const models = require('../models');
const User = models.user;

module.exports = (async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Token is required',
        })
    }
    const Token = token.split(' ')[1];
    jwt.verify(Token, process.env.JWT_SECRET_KEY, async function (err, decoded) {
        if (err) return res.status(500).json({
            statusCode: 500,
            message: 'Internal server error',
            error: err.message,
        });
        //console.log(decoded)
        User.findOne({where:{ id: decoded.id }})
            .then((data) => {
                if (!data) {
                    return res.status(400).json({
                        statusCode: 400,
                        message: 'User not found'
                    });
                } else {
                    req.userData = decoded;
                    next();
                }
            }).catch((e) => {
                return res.status(500).json({
                    statusCode: 500,
                    message: 'Internal server error',
                    error: err.message,
                });
            });
    });
})