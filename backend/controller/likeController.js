const utill = require('../utill/helper')
const models = require('../models');
const LikeModel = models.Like
const { where } = require('sequelize');

exports.likePost = async (req, res) => {
    try {
        let { user_id, post_id } = req.body
        let insertData = {
            user_id: user_id,
            post_id: post_id
        }
        console.log(insertData)
        let saveLike = await LikeModel.create(insertData)
        res.status(200).json({
            statusCode: 200,
            message: 'Liked Sucessfully',
            data: saveLike,
        });


    }
    catch (e) {
        console.log(e)
        res.status(500).json({
            statusCode: 500,
            message: 'Internal server error',
            error: e.message,
        });

    }
}