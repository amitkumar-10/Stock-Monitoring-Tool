const {model} = require("mongoose");
const {PositionSchema} = require('../Schema/PositionSchema');


const PositionModel = new model("position", PositionSchema, "position");


module.exports =  {PositionModel};