const router = require("express").Router();
const {authMiddleware} = require("../middleware/auth")
const { addUser, updateUser, deleteUser, getOneUser, userLogin, generateToken, logOut, getProfile} = require("../controller/usercontroller")





router.post("/add", addUser);   //adding users to db, user registration

router.put("/updateuser/:id", authMiddleware, updateUser);  //update user detials

router.delete("/deleteuser/:id", authMiddleware, deleteUser);   //remove users

router.get("/getoneuser/:id",authMiddleware, getOneUser);   //user profile data

router.post("/userlogin", userLogin);    //loggin to system and generate jwt

router.post("/token", generateToken);   //generate new access token

router.delete("/logout", logOut);    //logout from sysytem and removing the refresh token from db

router.get('/profile', getProfile);


module.exports = router;