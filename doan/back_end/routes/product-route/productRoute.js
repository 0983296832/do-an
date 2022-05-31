const express = require("express");
const route = express.Router();
const controller = require("../../controller/product-controller");
const {
  checkAuth,
  checkRole,
} = require("../../controller/auth-controller/verify");

route.get("/get-all", checkAuth, checkRole, controller.getAll);
route.get("/get-details/:id", checkAuth, checkRole, controller.getDetail);
route.get("/create", checkAuth, checkRole, controller.create);
route.get("/supplier", checkAuth, checkRole, controller.getSupplier);
route.put(
  "/update-supplier/:id",
  checkAuth,
  checkRole,
  controller.updateSupplier
);
route.put(
  "/upload-image/:id",
  checkAuth,
  checkRole,
  controller.uploadProductImage
);
route.put("/update/:id", checkAuth, checkRole, controller.updateProduct);
route.post("/comment/:id", checkAuth, controller.comment);
route.post("/import", checkAuth, checkRole, controller.importProduct);

module.exports = route;
