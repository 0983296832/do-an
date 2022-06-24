const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  author_image: { type: String, required: true },
  content: { type: String, required: true },
  views: { type: Number },
  created: { type: Date, default: Date.now },
});

module.exports = postDB = mongoose.model("posts", postSchema);
