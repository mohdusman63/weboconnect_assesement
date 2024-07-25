const { body, validationResult } = require('express-validator');



const registerValidationRules = () => {
    return [
        body('name').exists().notEmpty().trim().withMessage('name type is required.'),
        body('email').exists().notEmpty().trim().withMessage('email  is required.'),
        body('password').exists().notEmpty().trim().withMessage('password type is required.'),


    ];
};

const loginValidationRules = () => {
    return [
        body('email').exists().notEmpty().trim().withMessage('email type is required.'),
        body('password').exists().notEmpty().trim().withMessage('password type is required.'),


    ];
}

const likeValidationRules = () => {
    return [
        body('user_id').exists().notEmpty().trim().withMessage('user_id is required.'),
        body('post_id').exists().notEmpty().trim().withMessage('post_id is required.'),


    ];
}

const postValidationRules = () => {
    return [
        body('title').exists().notEmpty().trim().withMessage('title is required.'),
        body('content').exists().notEmpty().trim().withMessage('content is required.'),




    ];
}
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }


    return res.status(422).json({
        message: 'enter required field',
        errors: errors.array(),
    });



};

module.exports = {
    loginValidationRules,
    registerValidationRules,
    likeValidationRules,
    postValidationRules,
    validate,

};
