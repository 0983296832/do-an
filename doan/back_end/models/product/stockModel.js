const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  data: { type: Array },
  created: { type: Date, default: Date.now() },
});

module.exports = stockDB = mongoose.model("stocks", stockSchema);
