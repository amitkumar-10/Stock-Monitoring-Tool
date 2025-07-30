const { model } = require("mongoose");
const {OrderSchema} = require('../Schema/OrderSchema');

const OrderModel = new model("order", OrderSchema, "order");

module.exports = {OrderModel};