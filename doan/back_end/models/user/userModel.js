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
  // age: {
  //   type: Number,
  // },
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
  hobbie: {
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
  points: { type: Number, default: 0 },
  vouchers: { type: Array },
  favorite_product: { type: Array },
  history: { type: Array },
});
const usersDB = mongoose.model("users", userSchema);

module.exports = usersDB;
