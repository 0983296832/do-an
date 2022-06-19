const productsDB = require("../../models/product/product");
const _ = require("lodash");
const cloudinary = require("../../helper/cloudinaryConfig");
const productImage = require("../../models/product/productImage");
const commentDB = require("../../models/product/commentModel");
const suppliersDB = require("../../models/product/supplierModel");
const Features = require("../../lib/feature");

// tìm tất cả sản phẩm
exports.getAll = async (req, res) => {
  try {
    //tìm sản phẩm
    const features = new Features(
      productsDB
        .find()
        .populate({ path: "image" })
        .populate({ path: "supplier" }),
      req.query
    )
      .sorting()
      .paginating()
      .searching()
      .filtering();

    //đếm sản phẩm vừa tìm được
    const counting = new Features(
      productsDB
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

    const product = result[0].status === "fulfilled" ? result[0].value : [];
    const count = result[1].status === "fulfilled" ? result[1].value : 0;

    return res.status(200).json({
      status: "200",
      message: "get all product successfully",
      data: product,
      count: count,
    });
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};

// tìm 1 sản phẩm
exports.getDetail = async (req, res) => {
  try {
    const product = await productsDB
      .findById(req.params.id)
      .populate({ path: "image" })
      .populate({ path: "supplier" })
      .populate({ path: "comments" });
    return res.status(200).json({
      status: "200",
      message: "get product successfully",
      data: { product },
    });
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};

//sửa sản phẩm
exports.updateProduct = async (req, res) => {
  try {
    // ktra thông tin nhận từ client có trống hay không
    if (_.isEmpty(req.body)) {
      return res
        .status(400)
        .json({ status: "400", message: "body can not be empty" });
    }
    // cập nhật nó theo thông tin vừa gửi
    const data = await productsDB.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .json({ status: "200", message: "product updated", data });
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};

// xóa sản phẩm
exports.deleteProduct = async (req, res) => {
  try {
    const product = await productsDB.findById(req.params.id);
    if (!product) {
      return res
        .status(400)
        .json({ status: "400", message: "product not found" });
    }
    await product.remove();
    return res.status(200).json({
      status: "200",
      message: "product deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};

// tạo mới sản phẩm(không dùng đên)
exports.create = async (req, res) => {
  try {
    if (_.isEmpty(req.body)) {
      return res
        .status(400)
        .json({ status: "400", message: "body can not be empty" });
    }
    const product = await productsDB.findOne({
      product_code: req.body.product_code,
    });
    if (product) {
      return res
        .status(400)
        .json({ status: "400", message: "product does exist" });
    }
    const newProduct = new productsDB({
      product_code: req.body.product_code,
      name: req.body.name,
      price: req.body.price,
    });
    const savedProduct = await newProduct.save();
    return res.status(200).json({
      status: "200",
      message: "product saved successfully",
      data: savedProduct,
    });
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};

// thêm ảnh cho sản phẩm
exports.uploadProductImage = async (req, res) => {
  try {
    if (_.isEmpty(req.files)) {
      return res
        .status(400)
        .json({ status: "400", message: "body can not be empty" });
    }
    // /ktra xem sản phẩm có hay chưa
    const productExists = await productsDB.findById(req.params.id);
    if (!productExists) {
      return res
        .status(400)
        .json({ status: "400", message: "product not found" });
    }

    //hàm upload ảnh lên cloudinary sau đó trả về các đường dẫn của ảnh
    const uploads = async (path) => {
      if (!path) return;
      const newPath = await cloudinary.uploader.upload(path, {
        folder: productExists.name,
      });
      let newImage = new productImage({
        product_id: req.params.id,
        imageUrl: newPath.url,
        public_id: newPath.public_id,
      });
      // Save img
      const result = await newImage.save();
      return result;
    };

    // gọi hàm upload ảnh lên cloudinary rồi lưu vào database
    let urls = [];
    const files = req.files;
    Promise.all(files.map((file) => uploads(file.path)))
      .then((values) => {
        urls = values;
        return urls;
      })
      .then((urls) =>
        productsDB.findOne({ _id: req.params.id }).then((result, err) => {
          if (err) {
            return res.status(500).json({
              status: "500",
              message: "can not find product",
            });
          } else {
            if (result.image.length == 0) {
              result.image = urls;
              result.save();
            } else {
              urls.forEach((url) => {
                result.image.push(url);
              });
              result.save();
            }
            return res
              .status(200)
              .json({ status: "200", message: "images saved", data: result });
          }
        })
      )
      .catch((err) => {
        return res.status(400).json({ status: "400", message: err.message });
      });
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};

//comment sản phẩm
exports.comment = async (req, res) => {
  try {
    if (_.isEmpty(req.body)) {
      res
        .status(400)
        .json({ status: 400, message: "content can not be empty" });
    }
    const comment = new commentDB({
      name: req.body.name,
      content: req.body.content,
      vote: req.body.vote,
    });
    const commentSaved = await comment.save();
    await productsDB.findById(req.params.id).then((result, err) => {
      if (err) {
        return res.status(500).json({
          success: "false",
          message: "can not find product",
        });
      } else {
        result.comments.push(commentSaved);
        let rate = result.votes;
        if (result.votes == 0) {
          rate = Math.round((result.votes + commentSaved.vote) / 0.5) * 0.5;
        } else {
          rate = Math.round((result.votes + commentSaved.vote) / 2 / 0.5) * 0.5;
        }
        result.votes = rate;
        result.save();
      }
    });
    return res.status(200).json({
      status: "200",
      message: "comment success",
      comment: commentSaved,
    });
  } catch (error) {
    res.status(400).json({ status: "200", message: error.message });
  }
};

// thêm sản phẩm
exports.importProduct = async (req, res) => {
  try {
    if (_.isEmpty(req.body)) {
      res
        .status(400)
        .json({ status: 400, message: "content can not be empty" });
    }
    //tìm sản phẩm xem có tồn tại hay không
    const existProduct = await productsDB.findOne({
      product_code: req.body.product_code,
    });
    if (existProduct) {
      // nếu có tồn tại thì sẽ tạo mới hóa đơn trong nhà cung cấp
      const newProductImport = new suppliersDB({
        name: req.body.name,
        supplier_name: req.body.supplier_name,
        address: req.body.address,
        phone: req.body.phone,
        gender: req.body.gender,
        email: req.body.email,
        brand: req.body.brand,
        product_code: req.body.product_code,
        price: req.body.price,
        color: req.body.color,
        category: req.body.category,
        quantity: req.body.quantity,
        size: req.body.size,
      });
      const savedProductImport = await newProductImport.save();
      const { color, quantity, size } = savedProductImport;
      // tìm đến sản phẩm đó và update các giá trị màu sz và số lượng
      const existColorAndSize = existProduct.details.find(
        (item) => item.color === color && item.size === size
      );

      let newDetails;
      // nếu có tồn tại màu và sz trước đó r thì tăng số lượng
      if (existColorAndSize) {
        newDetails = existProduct.details.map((item) => {
          if (item.color === color && item.size === size) {
            return {
              ...item,
              quantity: item.quantity + quantity,
            };
          } else {
            return item;
          }
        });
      } else {
        newDetails = [...existProduct.details, { color, quantity, size }];
      }
      //  ngược lại sẽ thêm màu và sz mới vào chi tiết sản phẩm
      productsDB
        .findOne({ product_code: req.body.product_code })
        .then((result, err) => {
          if (result) {
            result.supplier.push(savedProductImport);
            result.save();
          } else {
            return res
              .status(400)
              .json({ status: "400", message: err.message });
          }
        });

      const result = await productsDB.updateOne(
        {
          product_code: req.body.product_code,
        },
        {
          details: newDetails,
        },
        { new: true }
      );
      return res.status(200).json({
        status: "200",
        message: "import successfully",
        data: result,
      });
    }

    // ngược lại nếu sp chưa tồn tại thì tạo mới hóa đơn nhà cùng cấp và tạo sản phẩm mới
    const newProductImport = new suppliersDB({
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      gender: req.body.gender,
      brand: req.body.brand,
      product_code: req.body.product_code,
      price: req.body.price,
      color: req.body.color,
      category: req.body.category,
      quantity: req.body.quantity,
      size: req.body.size,
      supplier_name: req.body.supplier_name,
    });
    const newProduct = new productsDB({
      product_code: req.body.product_code,
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      brand: req.body.brand,
      gender: req.body.gender,
      createdAt: Date.now(),
    });
    await newProduct.save();
    const savedProductImport = await newProductImport.save();
    const { color, quantity, size } = savedProductImport;
    productsDB
      .findOne({ product_code: req.body.product_code })
      .then((result, err) => {
        if (result) {
          result.details.push({ color, quantity, size });
          result.supplier.push(savedProductImport);
          result.save();
          return res.status(200).json({
            status: "200",
            message: "import successfully",
            data: result,
          });
        } else {
          return res.status(400).json({ status: "400", message: err.message });
        }
      });
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};

// tìm nhà cung cấp
exports.getSupplier = async (req, res) => {
  try {
    const features = new Features(suppliersDB.find(), req.query)
      .sorting()
      .paginating()
      .searching()
      .filtering();

    const counting = new Features(
      suppliersDB
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

    const supplier = result[0].status === "fulfilled" ? result[0].value : [];
    const count = result[1].status === "fulfilled" ? result[1].value : 0;

    return res.status(200).json({
      status: "200",
      message: "get all supplier successfully",
      data: supplier,
      count: count,
    });
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};

// sửa nhà cung cấp
exports.updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await suppliersDB.findById(id);
    if (!supplier) {
      return res
        .status(400)
        .json({ status: "400", message: "can not find supplier" });
    }
    const result = await suppliersDB.updateOne(
      { _id: id },
      {
        $set: {
          name: req.body.name,
          address: req.body.address,
          phone: req.body.phone,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      status: "200",
      message: "update supplier successfully",
      data: result,
    });
  } catch (err) {
    return res.status(400).json({ status: "400", message: err.message });
  }
};

//tăng lượt xem sản phẩm
exports.increaseViews = async (req, res) => {
  try {
    await productsDB.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    return res.status(200).json({
      status: "200",
      message: "increase views successfully",
    });
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};
