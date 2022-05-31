const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    product_id: { type: String, required: true },
    imageUrl: {
      type: String,
      required: true,
    },
    public_id: String,
  },
  {
    strict: false,
  }
);

module.exports = ImageProductDB = mongoose.model("imageproducts", imageSchema);
