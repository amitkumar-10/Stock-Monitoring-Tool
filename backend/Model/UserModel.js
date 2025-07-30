const {model} = require("mongoose");
const {UserSchema} = require('../Schema/UserSchema');


const UserModel = new model("user", UserSchema, "user");


module.exports =  {UserModel};