const usersDB = require("../../models/user/userModel");
const productsDB = require("../../models/product/product");
const cartsDB = require("../../models/user/cartModel");
const bcrypt = require("bcryptjs");
const { passwordValidation } = require("../../validate/validate");
const cloudinary = require("../../helper/cloudinaryConfig");
const ImageModel = require("../../models/user/imageModel");
const Features = require("../../lib/feature");
const ObjectId = require("mongodb").ObjectID;

exports.findAll = async (req, res) => {
  try {
    const features = new Features(
      usersDB
        .find()
        .populate({ path: "image" })
        .populate({ path: "orders" })
        .populate({ path: "carts" }),
      req.query
    )
      .sorting()
      .paginating()
      .searching()
      .filtering();
    const counting = new Features(
      usersDB
        .find()
        .populate({ path: "image" })
        .populate({ path: "orders" })
        .populate({ path: "carts" }),
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

    const users = result[0].status === "fulfilled" ? result[0].value : [];
    const count = result[1].status === "fulfilled" ? result[1].value : 0;

    return res.status(200).json({
      status: "200",
      message: "get all user successfully!",
      result: users.map((i) => {
        const { _id: id, ...rest } = i;
        const { password, ...last } = rest._doc;
        return {
          id,
          ...last,
        };
      }),
      count,
    });
  } catch (error) {
    return res.status(400).json({
      status: "400",
      message: error.message,
      result: [],
    });
  }
};
exports.findByEmail = async (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({
      status: "400",
      message: "get user failed!",
      result: [],
    });
  }
  try {
    const data = await usersDB.find({ email: req.body.email });
    return res.status(200).json({
      status: "200",
      message: "get all user successfully!",
      result: data,
    });
  } catch (error) {
    return res.status(400).json({
      status: "400",
      message: error.message,
      result: [],
    });
  }
};

exports.findById = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({
      status: "400",
      message: "get user failed!",
      result: [],
    });
  }
  try {
    const data = await usersDB
      .findById(req.params.id)
      .populate({ path: "image" })
      .populate({ path: "orders" })
      .populate({ path: "carts" });
    return res.status(200).json({
      status: "200",
      message: "get user successfully!",
      result: data,
    });
  } catch (error) {
    return res.status(200).json({
      status: "400",
      message: error.message,
      result: [],
    });
  }
};
exports.updateById = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({
      status: "400",
      message: "update user failed!",
      result: [],
    });
  }

  let newBody;
  if (req.body.password) {
    //validate the password
    const { error } = passwordValidation({ password: req.body.password });
    if (error)
      return res
        .status(400)
        .json({ status: 400, message: error.details[0].message, result: [] });
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    newBody = { ...req.body, password: hashedPassword };
  } else {
    newBody = { ...req.body };
  }

  if (req.body.birth) {
    newBody.birth = new Date(req.body.birth);
  }

  try {
    const data = await usersDB.findByIdAndUpdate(req.params.id, newBody, {
      useFindAndModify: false,
      new: true,
    });
    return res.status(200).json({
      status: "200",
      message: "update user successfully!",
      result: data,
    });
  } catch (error) {
    return res.status(200).json({
      status: "400",
      message: error.message,
      result: [],
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const user = await usersDB.findById(req.params.id);
    if (!user)
      return res.status(400).json({ status: "400", message: "user not found" });
    //check password
    const validPass = await bcrypt.compare(
      req.body.old_password,
      user.password
    );
    if (!validPass)
      return res
        .status(400)
        .json({ status: "400", message: "Password incorrect" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    await usersDB.findByIdAndUpdate(req.params.id, {
      password: hashedPassword,
    });
    return res.status(200).json({
      status: "200",
      message: "change password successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      status: "400",
      message: error.message,
    });
  }
};
exports.deleteById = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({
      status: "400",
      message: "delete user failed!",
    });
  }
  try {
    await usersDB.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      status: "200",
      message: "delete user successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      status: "400",
      message: error.message,
    });
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
      folder: "user",
    });
    // Create new img
    let newImage = new ImageModel({
      user_id: id,
      imageUrl: result.url,
      public_id: result.public_id,
    });

    // delete existing Image
    await ImageModel.deleteOne({ user_id: id });
    // Save img
    const image = await newImage.save();
    usersDB.findById(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: "false",
          message: "can not find product",
        });
      } else {
        result.image = image;
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
exports.deleteImage = async (req, res) => {
  try {
    const imageId = req.params.id;
    const img = await ImageModel.findById(imageId);
    if (!img) {
      return res
        .status(400)
        .json({ status: "400", message: "image not exists" });
    } else {
      // delete existing Image
      await ImageModel.findByIdAndRemove(imageId);
      const result = await cloudinary.uploader.destroy(img.public_id);
      await usersDB.findByIdAndUpdate(
        img.user_id,
        { image: null },
        {
          useFindAndModify: false,
          new: true,
        }
      );
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const cartItemExist = await cartsDB.find({
      user_id: req.params.id,

      product_code: req.body.product_code,
      product_color: req.body.product_color,
      product_size: req.body.product_size,
    });
    if (cartItemExist.length > 0) {
      cartsDB
        .find({
          user_id: req.params.id,

          product_code: req.body.product_code,
          product_color: req.body.product_color,
          product_size: req.body.product_size,
        })
        .then((result, err) => {
          if (result) {
            result[0].product_quantity += Number(req.body.product_quantity);
            result[0].save();
            return res.status(200).json({
              status: "200",
              message: "add to cart success",
              data: result[0],
            });
          }
        });
    } else {
      const cart = new cartsDB({
        user_id: req.params.id,
        product_id: req.body.product_id,
        product_code: req.body.product_code,
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_image: req.body.product_image,
        product_quantity: req.body.product_quantity,
        product_color: req.body.product_color,
        product_size: req.body.product_size,
        product_category: req.body.product_category,
        product_brand: req.body.product_brand,
      });
      const cartSaved = await cart.save();
      usersDB.findById(req.params.id).then((result, err) => {
        if (result) {
          result.carts.push(cartSaved);
          result.save();
          return res.status(200).json({
            status: "200",
            message: "add to cart success",
            data: cartSaved,
          });
        } else {
          return res.status(500).json({
            status: "500",
            message: "can not find user",
          });
        }
      });
    }
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    await cartsDB.findByIdAndUpdate(req.params.id, {
      product_quantity: req.body.product_quantity,
    });
    return res.status(200).json({
      status: "200",
      message: "update cart success",
    });
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};
exports.deleteCart = async (req, res) => {
  try {
    await cartsDB.findByIdAndDelete(req.body.cart_id);
    await usersDB.findByIdAndUpdate(req.params.id, {
      $pull: { carts: req.body.cart_id },
    });

    return res.status(200).json({
      status: "200",
      message: "delete cart success",
    });
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};

exports.changeRewards = async (req, res) => {
  try {
    const user = await usersDB.findById(req.params.id);
    if (user.points - req.body.points < 0) {
      return res.status(400).json({
        status: "400",
        message: "not enough points",
      });
    }
    await usersDB.findByIdAndUpdate(req.params.id, {
      points: user.points - req.body.points,
    });
    usersDB.findById(req.params.id).then((result, err) => {
      if (result) {
        result.vouchers.push(req.body.value);
        result.save();
        return res.status(200).json({
          status: "200",
          message: "change rewards success",
          data: result,
        });
      } else {
        return res.status(500).json({
          status: "500",
          message: "can not find user",
        });
      }
    });
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};

exports.AddToFavorite = async (req, res) => {
  try {
    const user = await usersDB.findById(req.params.id);
    const existFavor = user.favorite_product.find(
      (item) => item.id == req.body.id
    );
    if (existFavor) {
      const newFavor = user.favorite_product.map((item) => {
        if (item.id == req.body.id) {
          return { ...item, views: item.views + 1 };
        } else return item;
      });
      await usersDB.findByIdAndUpdate(req.params.id, {
        favorite_product: newFavor,
      });
    } else {
      await usersDB.findByIdAndUpdate(req.params.id, {
        $push: { favorite_product: { id: req.body.id, views: 1 } },
      });
    }
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};

exports.getFavorite = async (req, res) => {
  try {
    const user = await usersDB.findById(req.params.id);
    const favorite_product = user.favorite_product
      .sort((a, b) => b.views - a.views)
      .map((item) => {
        return item.id;
      });
    var oids = [];
    favorite_product.forEach(function (item) {
      oids.push(new ObjectId(item));
    });

    const product = await productsDB
      .find({ _id: { $in: oids } })
      .populate("image");
    var sortProduct = [];
    favorite_product.forEach(function (item) {
      const findItem = product.find((i) => i._id == item);
      if (findItem) sortProduct.push(findItem);
    });

    return res.status(200).json({
      status: 200,
      message: "get favorite product successfully",
      data: sortProduct,
    });
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};
