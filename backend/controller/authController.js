const utill = require('../utill/helper')
const models = require('../models');
const UserModel = models.user;

exports.register = async (req, res) => {
    try {
        console.log(req.body)
        const { email, name, password } = req.body;

        // Check for existing user with the same email
        const existingUser = await UserModel.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                statusCode: 400,
                message: 'Email already in use',
            });
        }

        // Create a new user
        const hashedPassword = utill.hashPassword(password);
        const user = await UserModel.create({
            email,
            name,
            password: hashedPassword
        });

        // Generate a token
        const token = utill.generateToken(user.toJSON());

        // Prepare response data
        const responseData = {};
        responseData.user_id = user.id
        responseData.email = user.email
        responseData.token = token

        // Send response
        res.status(200).json({
            statusCode: 200,
            message: 'Registered successfully',
            data: responseData,
        });

    } catch (error) {
        // Log the error for internal tracking
        console.error('Error during registration:', error);

        // Send error response
        res.status(500).json({
            statusCode: 500,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let getUsers = await UserModel.findOne({ where: { email: email } });

        if (!getUsers) {
            return res.status(400).json({
                statusCode: 400,
                message: 'Wrong email or password',
            });
        }
        const isMatch = utill.compareHashPassword(password, getUsers.password);
        if (!isMatch) {
           return res.status(400).json({
                statusCode: 400,
                message: 'Wrong email or password',
            });
        }
        getUsers = getUsers.toJSON();
        const token = utill.generateToken(getUsers);

        getUsers.token = token;
        res.status(200).json({
            statusCode: 200,
            message: 'Login successfully',
            data: getUsers,
        });

    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

