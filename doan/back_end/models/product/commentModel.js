const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String },
  reply: { type: Array },
  vote: { type: Number, required: true },
  created: { type: Date, default: Date.now },
});

module.exports = commentDB = mongoose.model("comments", commentSchema);
