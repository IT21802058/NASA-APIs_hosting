const User = require("../models/users");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const generateAccessToken  = require("../config/jwtToken");
const generateRefreshToken = require("../config/refreshToken");
const bcrypt = require('bcrypt');

//create new user
const addUser = asyncHandler(async (req, res) => {
    const { name, email, password, userType } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        userType
    });

    await newUser.save()
        .then(() => {
            res.status(201).send({ status: "User Added Successfully", user: newUser });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send({ status: "Error with creating data" });
        });
});


//update user details
const updateUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const {  name, email, password, userType } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const updatedUser = {  name, email, password:hashedPassword, userType };

    await User.findByIdAndUpdate(userId, updatedUser)
        .then(() => {
            res.status(200).send({ status: "User updated", user: updatedUser });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send({ status: "Error with updating data" });
        });
});


//remove user from data base
const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ status: "User not found" });
        }
        await User.findByIdAndDelete(userId)
        res.status(200).send({ status: "User removed" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "Error with deleting data" });
    }
});


//fetch one user
const getOneUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ status: "User not found" });
        }

        res.status(200).send({ status: "User fetched", user });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "Error with fetching one user data" });
    }
    
});


//loging method
const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        const loguser = await User.findOne({ email });

        if (!loguser) {
            return res.status(404).send({ status: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, loguser.password);

        if (passwordMatch) {
            const userlogtype = loguser.userType;
            const name = loguser.name;
            const id = loguser._id;
            const loggertype = { name: name, id:id, useremail: email, userType: userlogtype };
            //const accessToken = generateAccessToken.generateAccessToken(loggertype);
            jwt.sign(loggertype, process.env.ACCESS_TOKEN_SECRET, {}, (err, token) =>{
                if(err) throw err;
                res.cookie('token', token).json(loguser);
            })
            const refreshToken = generateRefreshToken(loggertype);
            loguser.refreshToken = refreshToken;
            await loguser.save();
            res.status(200).send({ status: "User logged Successfully", accessToken, refreshToken });
        } else {
            res.status(412).send({ status: "User password is incorrect" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "Error with logging functionality" });
    }
});


//generate token from refreshtoken
const generateToken = asyncHandler(async (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (refreshToken == null) {
        res.status(401).send({ status: "Token is null" });
    }

    try {
        const user = await User.findOne({ refreshToken });
        if (!user) {
            res.status(403).send({ status: "Invalid refresh token" });
            return;
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
            if (error) {
                res.status(403).send({ status: "Invalid refresh token" });
                return;
            }

            const accessToken = generateAccessToken.regenerateAccessToken(decoded);
            res.send({ accessToken });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "Error with token generation" });
    }
});


//logout method
const logOut = asyncHandler(async (req, res) => {
    const refreshToken = req.body.refreshtoken;
    if (refreshToken == null) {
        return res.status(401).send({ status: "Token is null" });
    }
    await User.findOneAndUpdate({ refreshToken }, { $set: { refreshToken: null } })
        .then(() => {
            res.status(200).send({ status: "Logged out successfully" });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send({ status: "Error with logout functionality" });
        });
});

const getProfile = asyncHandler(async(req,res)=>{
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {}, (err, user)=>{
            if(err) throw err;
            res.json(user)
        })
    }else{
        res.json(null);
    }
    
})


//expotation
module.exports = { 
    addUser,
    updateUser, 
    deleteUser, 
    getOneUser,
    userLogin, 
    generateToken, 
    logOut,
    getProfile 
};
