const jwt = require("jsonwebtoken");

// check xem đã đăng nhập chưa
const checkAuth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).json({ status: 401, message: "Access denied" });

  try {
    // ktra xem token có phải do server tạo ra hay không
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (verified) next();
  } catch (err) {
    res.status(400).json({ status: 400, message: "Invalid token" });
  }
};
// check quyền
const checkRole = (req, res, next) => {
  const token = req.header("auth-token");
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const role = verified.role;
    // nếu lớn hơn 1 tức là ađmin thì sẽ cho tiếp tục gọi api đó ngược lại thì báo lỗi
    if (role > 1) next();
    else res.status(400).json({ status: 400, message: "you are not admin" });
  } catch (err) {
    res.status(400).json({ status: 400, message: "Invalid token" });
  }
};
module.exports = { checkAuth, checkRole };
