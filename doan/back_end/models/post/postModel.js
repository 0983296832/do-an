const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  author_image: { type: String, required: true },
  thumbnail: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
  content: { type: String, required: true },
  views: { type: Number, default: 0 },
  created: { type: Date, default: Date.now },
});

module.exports = postDB = mongoose.model("posts", postSchema);
