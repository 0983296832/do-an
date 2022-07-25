const postDB = require("../../models/post/postModel");
const imageModel = require("../../models/user/imageModel");
const _ = require("lodash");
const cloudinary = require("../../helper/cloudinaryConfig");
const Features = require("../../lib/feature");

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
    return res.status(200).json({
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
    const data = await postDB.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .json({ status: "200", message: "updated successfully", data });
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};
exports.deletePostById = async (req, res) => {
  try {
    await postDB.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ status: "200", message: "delete post successfully" });
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};
exports.getAll = async (req, res) => {
  try {
    const features = new Features(
      postDB.find().populate({ path: "thumbnail" }),
      req.query
    )
      .sorting()
      .paginating()
      .searching()
      .filtering();

    const counting = new Features(
      postDB.find().populate({ path: "thumbnail" }),
      req.query
    )
      .sorting()
      .searching()
      .filtering()
      .counting();
    const result = await Promise.allSettled([
      features.query,
      counting.query, //count number of user.
    ]);

    const post = result[0].status === "fulfilled" ? result[0].value : [];
    const count = result[1].status === "fulfilled" ? result[1].value : 0;

    return res.status(200).json({
      status: "200",
      message: "get all product successfully",
      data: post,
      count: count,
    });
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};
exports.getPostById = async (req, res) => {
  try {
    const data = await postDB.findById(req.params.id);
    return res
      .status(200)
      .json({ status: "200", message: "Get details successfully", data });
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};
exports.increaseView = async (req, res) => {
  try {
    await postDB.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    return res
      .status(200)
      .json({ status: "200", message: "ince successfully" });
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};

exports.upload = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ status: 400, message: "Content can not be empty!" });
  }
  try {
    const id = req.params.id;
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.files[0].path, {
      folder: "post",
    });
    // Create new img
    let newImage = new ImageModel({
      user_id: id,
      imageUrl: result.url,
      public_id: result.public_id,
    });

    // delete existing Image
    await imageModel.deleteOne({ user_id: id });
    // Save img
    const image = await newImage.save();
    postDB.findById(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: "false",
          message: "can not find product",
        });
      } else {
        result.thumbnail = image;
        result.save();
        return res
          .status(200)
          .json({ status: "200", result: { ...image._doc } });
      }
    });
  } catch (err) {
    return res.status(400).json({ status: "400", message: err.message });
  }
};
