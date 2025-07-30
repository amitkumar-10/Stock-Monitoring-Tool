const {Schema} = require("mongoose");

const UserSchema = new Schema ({
   email: {type: String, unique: true},
    password:String,
    name:String
})

module.exports = {UserSchema};