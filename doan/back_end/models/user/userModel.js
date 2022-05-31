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
  },
  image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
  sex: {
    type: String,
  },
  address: {
    type: String,
  },
  status: {
    type: String,
  },
  birth: {
    type: Date,
  },
  role: {
    type: Number,
    required: true,
  },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "orders" }],
});
const usersDB = mongoose.model("users", userSchema);

module.exports = usersDB;
