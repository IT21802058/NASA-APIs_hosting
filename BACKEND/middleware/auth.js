const Users = require("../models/users");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

//checking if token available and is it valid token
const authMiddleware = asyncHandler(async(req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('bearer') ){
        token = req.headers.authorization.split(" ")[1];
        try{
            if(token){
                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                const email = decoded.useremail;
                const user = await Users.findOne({email});
                req.user = user;
                next();
            }else{
                res.status(400).send({status: "Token is empty"});
            }
        }catch(error){
            res.status(400).send({status: error});
        }
    }else{
        res.status(400).send({status: "There is no token attached to header"});
    }
})


// check wether the user is a facluty member
const isAstronomy = asyncHandler(async (req, res, next) => {
    const { email } = req.user;
    const astroUser = await Users.findOne({ email });
    if (astroUser.userType !== "astronomy") {
        res.status(405).send({status: "you are not an astroUser member"});
    } else {
      next();
    }
  });


// check wether the user is a student
const isMarsRover = asyncHandler(async (req, res, next) => {
    const { email } = req.user;
    const marsUser = await Users.findOne({ email });
    if (marsUser.userType !== "marsRover") {
        res.status(405).send({status: "you are not an Mars Rover member"});
    } else {
      next();
    }
  });


  //expotation
  module.exports = {
    authMiddleware, 
    isAstronomy, 
    isMarsRover
};