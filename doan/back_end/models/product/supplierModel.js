const mongoose = require("mongoose");

const suppliersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  supplier_name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  product_code: { type: String, required: true },
  price: { type: Number, required: true },
  gender: { type: String, required: true },
  color: { type: String, required: true },
  category: { type: String, required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
  created: { type: Date, default: Date.now },
});

module.exports = suppliersDB = mongoose.model("suppliers", suppliersSchema);
