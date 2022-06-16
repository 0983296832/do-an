const ordersDB = require("../../models/order/orderModels");
const productsDB = require("../../models/product/product");
const usersDB = require("../../models/user/userModel");
const Features = require("../../lib/feature");

const _ = require("lodash");

// tạo mới order
exports.order = async (req, res) => {
  try {
    if (_.isEmpty(req.body)) {
      return res
        .status(400)
        .json({ status: 400, message: "body can not be empty" });
    }
    // hàm để tìm sản phẩm và update số lượng sp
    const findByIdAndUpdateProduct = async (item) => {
      const product = await productsDB.findOne({
        product_code: item.product_code,
      });
      //  kiểm tra nếu có người dùng thì sẽ xóa nhưng sp vừa order ra khỏi giỏ hàng
      if (req.params.id != "random") {
        await usersDB.findByIdAndUpdate(req.params.id, {
          $pull: { carts: item._id },
        });
      }
      // tìm sản phẩm và giảm số lượng sản phẩm đó đồng thời tăng số lương đã bán
      product.details.map(async (i) => {
        if (i.color == item.color && i.size == item.size) {
          const newItem = { ...i, quantity: i.quantity - item.quantity };
          await productsDB.updateOne(
            { product_code: item.product_code },
            {
              $pull: {
                details: {
                  color: i.color,
                  quantity: i.quantity,
                  size: i.size,
                },
              },
            }
          );
          await productsDB.updateOne(
            { product_code: item.product_code },
            {
              $push: { details: newItem },
              $inc: { sales: item.quantity },
            }
          );
        }
      });
    };
    // gọi hàm trên
    Promise.all(
      req.body.details
        .map((item) => {
          return {
            ...item,
            image: item.product_image,
            price: item.product_price,
            quantity: item.product_quantity,
            size: item.product_size,
            color: item.product_color,
            name: item.product_name,
          };
        })
        .map((item) => findByIdAndUpdateProduct(item))
    );
    // tạo order trong dtb order
    const order = new ordersDB({
      details: req.body.details,
      name: req.body.name,
      email: req.body.email,
      state: req.body.state,
      image: req.body.image,
      address: req.body.address,
      phone: req.body.phone,
      payment_type: req.body.payment_type,
      shipping_unit: req.body.shipping_unit,
      shipping_fee: req.body.shipping_fee,
      note: req.body.note,
    });
    const savedOrder = await order.save();
    // sau khi lưu xong sẽ kiểm tra nếu có người dùng sẽ tìm và thêm order cho ng dùng đó
    // ngược lại thì chỉ tạo order trong dtb và không lưu cho ai cả
    if (req.params.id != "random") {
      usersDB.findById(req.params.id).then((result, err) => {
        if (err) {
          return res.status(400).json({ status: "400", message: err.message });
        } else {
          result.orders.push(savedOrder);
          result.save();
          return res.status(200).json({
            status: "200",
            message: "order successfully",
            data: savedOrder,
          });
        }
      });
    } else
      return res.status(200).json({
        status: "200",
        message: "order successfully",
        data: savedOrder,
      });
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};

// tìm tất cả order
exports.getAll = async (req, res) => {
  try {
    const features = new Features(ordersDB.find(), req.query)
      .sorting()
      .paginating()
      .searching()
      .filtering();

    const counting = new Features(
      ordersDB
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

    const orders = result[0].status === "fulfilled" ? result[0].value : [];
    const count = result[1].status === "fulfilled" ? result[1].value : 0;
    return res
      .status(200)
      .json({ status: "200", message: "success", data: orders, count });
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};

// update các thông tin của order chỉ cho update tên sđt email và trạng thái đơn hàng
exports.update = async (req, res) => {
  try {
    if (_.isEmpty(req.body)) {
      return res
        .status(400)
        .json({ status: 400, message: "body can not be empty" });
    }
    const order = await ordersDB.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .json({ status: "200", message: "success", data: order });
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};
