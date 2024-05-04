const jwt = require('jsonwebtoken');

//refreshtoken generation
const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "24h" });
};

//expotation
module.exports = generateRefreshToken;
