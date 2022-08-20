const productsDB = require("../../models/product/product");
const ordersDB = require("../../models/order/orderModels");
const _ = require("lodash");
const cloudinary = require("../../helper/cloudinaryConfig");
const productImage = require("../../models/product/productImage");
const commentDB = require("../../models/product/commentModel");
const suppliersDB = require("../../models/product/supplierModel");
const Features = require("../../lib/feature");
const usersDB = require("../../models/user/userModel");
const schedule = require("node-schedule");
const moment = require("moment");
const stockDB = require("../../models/product/stockModel");

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
        .populate({ path: "supplier" }),
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
    const result = await suppliersDB.findByIdAndUpdate(
      id,
      {
        supplier_name: req.body.supplier_name,
        address: req.body.address,
        phone: req.body.phone,
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

exports.getEarning = async (req, res) => {
  try {
    const data = await suppliersDB.find();
    const revenue = data.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    return res
      .status(200)
      .json({ status: "200", message: "get revenue success", data: revenue });
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};

exports.getTopUser = async (req, res) => {
  try {
    const data = await usersDB.find().populate("image");
    const topUsers = data
      .filter((user, index) => user.orders.length > 0)
      .slice(0, 5);
    return res.status(200).json({
      status: "200",
      message: "get top users successfully",
      data: topUsers,
    });
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};

exports.getProductsOutOfStock = async (req, res) => {
  try {
    const data = await productsDB.find().populate("image");
    const productsOutOfStock = data.filter((product) => {
      return (
        product.details.reduce((acc, item) => {
          return acc + item.quantity;
        }, 0) === 0
      );
    });
    return res.status(200).json({
      status: "200",
      message: "get products successfully",
      data: productsOutOfStock.map((item) => {
        return {
          product_id: item._id,
          product_code: item.product_code,
          product_name: item.name,
          product_price: item.price,
          product_category: item.category,
          product_brand: item.brand,
          product_quantity: item.details.reduce((acc, item) => {
            return acc + item.quantity;
          }, 0),
          product_image: item.image[0].imageUrl,
        };
      }),
    });
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};

const saveStockByMonth = async (req, res) => {
  try {
    const exitsData = await stockDB.findOne({
      month: Number(moment(Date.now()).format("MM")) - 1,
      year: Number(moment(Date.now()).format("YYYY")),
    });
    if (exitsData) return;
    const data = await productsDB.find().populate("image");
    const lastMonth = Number(moment(Date.now()).format("MM")) - 1;
    const thisYears = Number(moment(Date.now()).format("YYYY"));
    const stocks = new stockDB({
      month: lastMonth,
      year: thisYears,
      data: data,
    });
    await stocks.save();

    return;
  } catch (error) {
    return;
  }
};
schedule.scheduleJob("* * 1 */1 *", saveStockByMonth);

exports.getStocks = async (req, res) => {
  try {
    let product = { data: [] };
    if (req.body.month == moment(new Date()).format("M")) {
      product.data = await productsDB.find().populate("image");
    } else {
      product = await stockDB.findOne({
        month: { $eq: req.body.month },
        year: { $eq: req.body.year },
      });
      const tempProduct = await productsDB.find().populate("image");
      if (product)
        product.data = product.data.map((item) => {
          return {
            ...item,
            image: tempProduct.find((i) => i.product_code == item.product_code)
              .image,
          };
        });
    }

    const order = await ordersDB.find({
      state: "giao hàng thành công",
      receive_date: {
        $gte: new Date(
          moment()
            .month(Number(req.body.month) - 1)
            .startOf("month")
            .format("MM/DD/YYYY")
        ),
        $lte: new Date(
          moment()
            .month(Number(req.body.month) - 1)
            .endOf("month")
            .format("MM/DD/YYYY")
        ),
      },
    });

    const supplier = await suppliersDB.find({
      created: {
        $gte: new Date(
          moment().month(req.body.month).startOf("month").format("MM/DD/YYYY")
        ),
        $lte: new Date(
          moment().month(req.body.month).endOf("month").format("MM/DD/YYYY")
        ),
      },
    });

    const dataTable =
      product?.data.map(
        ({
          _id,
          product_code,
          name,
          image,
          price,
          details,
          brand,
          category,
        }) => {
          return {
            _id,
            product_code,
            name,
            image,
            brand,
            category,
            price,
            quantity: details.reduce((acc, item) => {
              return acc + item.quantity;
            }, 0),
            order:
              order
                .filter((i) =>
                  i.details.find((vl) => vl.product_code == product_code)
                )
                .reduce((acc, item) => {
                  return (
                    acc +
                    item.details.reduce((ac, it) => {
                      if (it.product_code == product_code)
                        return ac + it.product_quantity;
                    }, 0)
                  );
                }, 0) || 0,
            supplier: supplier
              .filter((item) => item.product_code == product_code)
              .reduce((acc, item) => {
                return acc + item.quantity;
              }, 0),
          };
        }
      ) || [];

    return res.status(200).json({
      status: "200",
      message: "get stock by month successfully",
      dataTable,
      product: {
        money:
          product?.data.reduce((acc, item) => {
            return (
              acc +
              item.details.reduce((a, i) => {
                return a + i.quantity;
              }, 0) *
              item.price
            );
          }, 0) || 0,
        quantity:
          product?.data.reduce((acc, item) => {
            return (
              acc +
              item.details.reduce((a, i) => {
                return a + i.quantity;
              }, 0)
            );
          }, 0) || 0,
      },
      order: {
        money: order
          .map((item) => {
            return (
              (item.details.reduce((acc, i) => {
                return acc + i.product_price * i.product_quantity;
              }, 0) *
                (100 - item.voucher)) /
              100 +
              25000
            );
          })
          .reduce((acc, item) => {
            return acc + item;
          }, 0),
        quantity: order.length,
      },
      supplier: {
        money: supplier.reduce((acc, cur) => {
          return acc + cur.price * cur.quantity;
        }, 0),
        quantity: supplier.reduce((acc, cur) => {
          return acc + cur.quantity;
        }, 0),
      },
    });
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};
