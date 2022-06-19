const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  details: { type: Array },
  name: { type: String, required: true },
  user_id: { type: String },
  image: { type: String, required: true },
  email: { type: String, required: true },
  created: {
    type: Date,
    default: Date.now(),
  },
  state: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  payment_type: { type: String, required: true },
  receive_date: { type: Date },
  shipping_unit: { type: String, required: true },
  shipping_fee: { type: Number, required: true },
});
const ordersDB = mongoose.model("orders", orderSchema);

module.exports = ordersDB;
