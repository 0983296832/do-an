const route = require("express").Router();
const {
  checkAuth,
  checkRole,
} = require("../../controller/auth-controller/verify");
const controller = require("../../controller/user-controller");

route.get("/get-all", checkAuth, checkRole, controller.findAll);
route.get("/:id", checkAuth, controller.findById);
route.post("/get-email", checkAuth, checkRole, controller.findByEmail);
route.put("/update/:id", checkAuth, controller.updateById);
route.put("/change-password/:id", checkAuth, controller.changePassword);
route.delete("/delete/:id", checkAuth, checkRole, controller.deleteById);
route.post("/upload/:id", checkAuth, controller.upload);
route.delete("/delete-image/:id", checkAuth, controller.deleteImage);
route.post("/add-to-cart/:id", controller.addToCart);
route.put("/update-cart/:id", controller.updateCart);
route.put("/delete-cart/:id", controller.deleteCart);
route.post("/change-rewards/:id", checkAuth, controller.changeRewards);
route.post("/add-to-favorite/:id", checkAuth, controller.AddToFavorite);
route.get("/get-favorite/:id", checkAuth, controller.getFavorite);
route.post("/add-to-history/:id", checkAuth, controller.AddToHistory);
route.get("/get-history/:id", checkAuth, controller.getHistory);

module.exports = route;
