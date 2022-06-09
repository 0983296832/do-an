const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  name_surname: {
    type: String,
    min: 6,
    max: 255,
    default: "",
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  phone: {
    type: String,
    default: "",
  },
  image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
  sex: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "online",
  },
  birth: {
    type: Date,
    default: Date.now(),
  },
  role: {
    type: Number,
    required: true,
  },
  carts: [{ type: mongoose.Schema.Types.ObjectId, ref: "carts" }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "orders" }],
});
const usersDB = mongoose.model("users", userSchema);

module.exports = usersDB;
