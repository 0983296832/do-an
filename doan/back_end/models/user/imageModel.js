const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  public_id: String,
});

module.exports = ImageModel = mongoose.model("Image", imageSchema);
