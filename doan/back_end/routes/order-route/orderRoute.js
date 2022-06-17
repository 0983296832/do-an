const express = require("express");
const route = express.Router();
const controller = require("../../controller/order-controller/index");
const {
  checkAuth,
  checkRole,
} = require("../../controller/auth-controller/verify");

route.post("/create/:id", controller.order);
route.put("/update/:id", controller.update);
route.get("/get-all", controller.getAll);
route.get("/get-by-id/:id", controller.getByOrderById);
route.get("/get-revenue", checkAuth, checkRole, controller.getRevenue);
route.get(
  "/get-revenue-by/:date",
  checkAuth,
  checkRole,
  controller.getRevenueBy
);
route.get(
  "/get-revenue-by-haft-year",
  checkAuth,
  checkRole,
  controller.getRevenueByHaflYear
);

module.exports = route;
