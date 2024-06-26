const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    
    name : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true
    },

    userType : {
        type : String,
        required : true,
    },

    refreshToken : {
        type : String,
    },

});

const Users = mongoose.model("User",usersSchema);

module.exports = Users;