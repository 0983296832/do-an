const express = require("express");
const route = express.Router();
const controller = require("../../controller/post-controller/index");
const {
  checkAuth,
  checkRole,
} = require("../../controller/auth-controller/verify");

route.post("/create", checkAuth, checkRole, controller.create);
route.put("/update/:id", checkAuth, checkRole, controller.update);
route.get("/get-all", checkAuth, checkRole, controller.getAll);
route.get("/get-by-id/:id", checkAuth, checkRole, controller.getByPostById);
route.get("/delete/:id", checkAuth, checkRole, controller.deletePostById);
route.get(
  "/increase-view/:id",
  checkAuth,
  checkRole,
  controller.increaseView
);

module.exports = route;
