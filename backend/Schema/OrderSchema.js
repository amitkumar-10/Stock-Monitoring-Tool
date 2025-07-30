const { Schema } = require("mongoose");

const OrderSchema = new Schema({
  name: String,
  qty: Number,
  price: Number,
  amount: Number,
  mode: String,
});

module.exports = {OrderSchema};
