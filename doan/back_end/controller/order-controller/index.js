const ordersDB = require("../../models/order/orderModels");
const productsDB = require("../../models/product/product");
const usersDB = require("../../models/user/userModel");
const Features = require("../../lib/feature");
const moment = require("moment");
const _ = require("lodash");
const cartsDB = require("../../models/user/cartModel");
const sendEmail = require("../../untils/sendEmail");

exports.order = async (req, res) => {
  try {
    if (_.isEmpty(req.body)) {
      return res
        .status(400)
        .json({ status: 400, message: "body can not be empty" });
    }

    const findByIdAndUpdateProduct = async (item) => {
      const product = await productsDB.findOne({
        product_code: item.product_code,
      });
      if (req.params.id != "random") {
        await usersDB.findByIdAndUpdate(req.params.id, {
          $pull: { carts: item._id },
        });
        await cartsDB.findByIdAndDelete(item._id);
      }

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
      user_id: req.body.details[0].user_id,
      voucher: req.body.voucher,
    });
    const savedOrder = await order.save();
    // HTML Message
    const message = `
     <h1>Thank you for your purchase from us.</h1>
     <h1>Your order code: ${savedOrder._id}</h1> 
     <a href=${
       process.env.WEB_URL + "/order/" + savedOrder._id
     }>Click to see your order: ${
      process.env.WEB_URL + "/order/" + savedOrder._id
    }</a> 
   `;

    await sendEmail({
      to: req.body.email,
      subject: "Order Success",
      html: message,
    });
    if (req.params.id != "random") {
      usersDB.findById(req.params.id).then((result, err) => {
        if (err) {
          return res.status(400).json({ status: "400", message: err.message });
        } else {
          result.orders.push(savedOrder);
          function singleArrayRemove(array, value) {
            var index = array.indexOf(value);
            if (index > -1) array.splice(index, 1);
            return array;
          }
          result.vouchers = singleArrayRemove(
            result.vouchers,
            req.body.voucher
          );
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
    if (req.body.state === "giao hàng thành công") {
      if (order.user_id != "") {
        usersDB
          .findById(order.user_id)
          .then((result, err) => {
            if (err) {
              return res
                .status(400)
                .json({ status: "400", message: err.message });
            } else {
              result.points =
                result.points +
                Math.round(
                  order.details.reduce((total, item) => {
                    return total + item.product_quantity * item.product_price;
                  }, 0) / 100000
                );
              result.save();
            }
          })
          .catch((err) => {
            return res
              .status(400)
              .json({ status: "400", message: err.message });
          });
      }
    }

    const findByIdAndUpdateProduct = async (item) => {
      const product = await productsDB.findOne({
        product_code: item.product_code,
      });

      product.details.map(async (i) => {
        if (i.color == item.color && i.size == item.size) {
          const newItem = { ...i, quantity: i.quantity + item.quantity };
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
              $inc: { sales: -item.quantity },
            }
          );
        }
      });
    };
    if (
      req.body.state === "đã hủy" ||
      req.body.state === "giao hàng không thành công"
    ) {
      const order = await ordersDB.findById(req.params.id);
      Promise.all(
        order.details
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
    }
    return res
      .status(200)
      .json({ status: "200", message: "success", data: order });
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};

exports.getByOrderById = async (req, res) => {
  try {
    const order = await ordersDB.findById(req.params.id);
    return res
      .status(200)
      .json({ status: "200", message: "success", data: order });
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};

exports.getRevenue = async (req, res) => {
  try {
    const data = await ordersDB.find({
      state: "giao hàng thành công",
    });
    const revenue = data
      .map((item) => {
        return (
          item.details.reduce((acc, i) => {
            return acc + i.product_price * i.product_quantity;
          }, 0) -
          (item.details.reduce((acc, i) => {
            return acc + i.product_price * i.product_quantity;
          }, 0) *
            item.voucher) /
            100 +
          25000
        );
      })
      .reduce((acc, item) => {
        return acc + item;
      }, 0);
    return res
      .status(200)
      .json({ status: "200", message: "get revenue success", data: revenue });
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};
exports.getRevenueBy = async (req, res) => {
  try {
    const date = req.params.date;
    let day;

    if (date == "day") {
      day = moment(new Date()).format("MM/DD/YYYY");
    } else if (date == "week") {
      day = moment(new Date()).startOf("week").format("MM/DD/YYYY");
    } else if (date == "month") {
      day = moment(new Date()).startOf("month").format("MM/DD/YYYY");
    } else if (date == "year") {
      day = moment(new Date()).startOf("year").format("MM/DD/YYYY");
    }
    const data = await ordersDB.find({
      state: "giao hàng thành công",
      receive_date: {
        $gte: new Date(day),
      },
    });

    const revenue = data
      .map((item) => {
        return (
          item.details.reduce((acc, i) => {
            return acc + i.product_price * i.product_quantity;
          }, 0) -
          (item.details.reduce((acc, i) => {
            return acc + i.product_price * i.product_quantity;
          }, 0) *
            item.voucher) /
            100 +
          25000
        );
      })
      .reduce((acc, item) => {
        return acc + item;
      }, 0);
    return res.status(200).json({
      status: "200",
      message: "get revenue success",
      data: revenue,
      details: data,
    });
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};
exports.getRevenueByHaflYear = async (req, res) => {
  try {
    const getRevenueByMonth = async (month) => {
      try {
        let data;
        if (req.params.id == "all") {
          data = await ordersDB.find({
            state: "giao hàng thành công",
            receive_date: {
              $gte: new Date(
                moment().month(month).startOf("month").format("MM/DD/YYYY")
              ),
              $lte: new Date(
                moment().month(month).endOf("month").format("MM/DD/YYYY")
              ),
            },
          });
        } else {
          data = await ordersDB.find({
            user_id: req.params.id,
            state: "giao hàng thành công",
            receive_date: {
              $gte: new Date(
                moment().month(month).startOf("month").format("MM/DD/YYYY")
              ),
              $lte: new Date(
                moment().month(month).endOf("month").format("MM/DD/YYYY")
              ),
            },
          });
        }

        if (data.length == 0) return 0;
        const revenue = data
          .map((item) => {
            return (
              item.details.reduce((acc, i) => {
                return acc + i.product_price * i.product_quantity;
              }, 0) -
              (item.details.reduce((acc, i) => {
                return acc + i.product_price * i.product_quantity;
              }, 0) *
                item.voucher) /
                100 +
              25000
            );
          })
          .reduce((acc, item) => {
            return acc + item;
          }, 0);
        return revenue;
      } catch (error) {
        return res.status(400).json({ status: "400", message: error.message });
      }
    };

    Promise.all(
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) =>
        getRevenueByMonth(month - 1)
      )
    )
      .then((data) => {
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        return res.status(200).json({
          status: "200",
          message: "get revenue success",
          data: data.map((item, index) => {
            return { name: monthNames[index], Total: item };
          }),
        });
      })
      .catch((err) =>
        res.status(400).json({ status: "400", message: err.message })
      );
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};
exports.getRevenueProductByHaflYear = async (req, res) => {
  try {
    const getRevenueByMonth = async (month) => {
      try {
        const data = await ordersDB.find({
          details: { $elemMatch: { product_id: req.params.id } },
          state: "giao hàng thành công",
          receive_date: {
            $gte: new Date(
              moment().month(month).startOf("month").format("MM/DD/YYYY")
            ),
            $lte: new Date(
              moment().month(month).endOf("month").format("MM/DD/YYYY")
            ),
          },
        });
        if (data.length == 0) return 0;
        const revenue = data
          .map((item) => {
            return item.details.reduce((acc, item) => {
              if (item.product_id == req.params.id) {
                return acc + item.product_price * item.product_quantity;
              }
            }, 0);
          })
          .reduce((acc, item) => {
            return acc + item;
          }, 0);
        return revenue;
      } catch (error) {
        return 0;
      }
    };

    Promise.all(
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) =>
        getRevenueByMonth(month - 1)
      )
    )
      .then((data) => {
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        return res.status(200).json({
          status: "200",
          message: "get revenue success",
          data: data.map((item, index) => {
            return { name: monthNames[index], Total: item };
          }),
        });
      })
      .catch((err) =>
        res.status(400).json({ status: "400", message: err.message })
      );
  } catch (error) {
    return res.status(400).json({ status: "400", message: error.message });
  }
};
