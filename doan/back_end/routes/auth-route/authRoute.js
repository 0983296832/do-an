const route = require("express").Router();
const { checkAuth } = require("../../controller/auth-controller/verify");
const controller = require("../../controller/auth-controller");

route.post("/register", controller.register);
route.post("/login", controller.login);
// route.post("/google_login", controller.googleLogin);
// route.post("/facebook_login", controller.facebookLogin);
route.post("/refresh", controller.refreshToken);
route.post("/logout", checkAuth, controller.logout);
route.post("/forgotpassword", controller.forgotPassword);
route.post("/checkotp", controller.checkOtp);
route.put("/resetpassword", controller.resetPassword);

module.exports = route;
