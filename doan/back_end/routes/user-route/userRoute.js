const route = require("express").Router();
const {
  checkAuth,
  checkRole,
} = require("../../controller/auth-controller/verify");
const controller = require("../../controller/user-controller");

route.get("/get-all", checkAuth, checkRole, controller.findAll);
route.get("/:id", checkAuth, checkRole, controller.findById);
route.post("/get-email", checkAuth, checkRole, controller.findByEmail);
route.put("/update/:id", checkAuth, controller.updateById);
route.put("/change-password/:id", checkAuth, controller.changePassword);
route.delete("/delete/:id", checkAuth, checkRole, controller.deleteById);
route.post("/upload/:id", checkAuth, controller.upload);
route.delete("/delete-image/:id", checkAuth, controller.deleteImage);
route.post("/add-to-cart/:id", controller.addToCart);
route.put("/update-cart/:id", controller.updateCart);
route.put("/delete-cart/:id", controller.deleteCart);


module.exports = route;
