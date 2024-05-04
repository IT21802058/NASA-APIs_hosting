const jwt = require('jsonwebtoken');

//token generator for logging
const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1800s" });
};

//token generator for refreshtoken
const regenerateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
};

//exportation
module.exports = {generateAccessToken, regenerateAccessToken};
