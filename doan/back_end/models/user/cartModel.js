const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  product_code: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  product_price: {
    type: Number,
    required: true,
  },
  product_image: {
    type: String,
    required: true,
  },
  product_quantity: {
    type: Number,
    required: true,
  },
  product_size: {
    type: Number,
    required: true,
  },
  product_color: {
    type: String,
    required: true,
  },
  product_brand: {
    type: String,
    required: true,
  },
  product_category: {
    type: String,
    required: true,
  },
});
const cartsDB = mongoose.model("carts", cartSchema);

module.exports = cartsDB;
