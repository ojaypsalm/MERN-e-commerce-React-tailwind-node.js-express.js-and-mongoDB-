const mongoose = require('mongoose')

const userSchema =  new mongoose.Schema({
    firstName : String,
    lastName : String,
    email: {
        type : String,
        unique : true,
        required : true,
        index : true
    },
    password : String,
    profilePic : String,
    role : String,

}, {
    timestamps : true
})

const userModel = mongoose.model('user', userSchema)


module.exports = userModel