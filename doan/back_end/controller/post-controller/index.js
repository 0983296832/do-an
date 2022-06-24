const postDB = require("../../models/post/postModel");
const _ = require("lodash");

exports.create = async (req, res) => {
  try {
    if (_.isEmpty(req.body)) {
      return res
        .status(400)
        .json({ status: "400", message: "body can not be empty" });
    }
    const post = new postDB({
      title: req.body.title,
      author: req.body.author,
      author_image: req.body.author_image,
      content: req.body.content,
    });
    const savePost = await post.save();
    return res
      .status(200)
      .json({
        status: "200",
        message: "Add new post successfully",
        data: savePost,
      });
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};
exports.update = async (req, res) => {
  try {
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};
exports.delete = async (req, res) => {
  try {
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};
exports.getAll = async (req, res) => {
  try {
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};
exports.getPostById = async (req, res) => {
  try {
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};
exports.increaseViews = async (req, res) => {
  try {
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};
