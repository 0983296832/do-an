const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).json({ status: 401, message: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (verified) next();
  } catch (err) {
    res.status(400).json({ status: 400, message: "Invalid token" });
  }
};
const checkRole = (req, res, next) => {
  const token = req.header("auth-token");
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const role = verified.role;
    if (role > 1) next();
    else res.status(400).json({ status: 400, message: "you are not admin" });
  } catch (err) {
    res.status(400).json({ status: 400, message: "Invalid token" });
  }
};
module.exports = { checkAuth, checkRole };
