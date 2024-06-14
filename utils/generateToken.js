const jwt = require('jsonwebtoken');

// function that will create a jwt token
function generateToken(user_details, secret_key) {
    try {
        const newToken = jwt.sign(
            {
                user_details
            },
            secret_key,
            {
                expiresIn: "1000s"
            }
        )

        return newToken;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    generateToken
};
