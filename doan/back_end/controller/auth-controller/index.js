const usersDB = require("../../models/user/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const {
  registerValidation,
  loginValidation,
} = require("../../validate/validate");
const sendEmail = require("../../untils/sendEmail");
const { passwordValidation } = require("../../validate/validate");

let arrRefreshToken = [];
let code = 600494;
setInterval(() => {
  code = Math.floor(100000 + Math.random() * 900000);
}, 120000);

exports.register = async (req, res) => {
  if (_.isEmpty(req.body)) {
    return res.status(400).json({
      status: "400",
      message: "Content can not be empty",
      result: [],
    });
  } else {
    const { error } = registerValidation(req.body);
    if (error)
      return res.status(400).json({
        status: "400",
        message: error.details[0].message,
        result: [],
      });

    //check email
    const emailExist = await usersDB.findOne({ email: req.body.email });
    if (emailExist)
      return res.status(400).send({
        status: "400",
        message: "Email already exists",
        result: [],
      });
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //create new user
    const user = new usersDB({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    });
    try {
      const saveUser = await user.save();
      return res
        .status(201)
        .json({ status: "201", message: "Register success", user: saveUser });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
};

exports.login = async (req, res) => {
  if (_.isEmpty(req.body)) {
    return res.status(400).json({
      status: "400",
      message: "Content can not be empty",
      result: [],
    });
  } else {
    //validate the data
    const { error } = loginValidation(req.body);
    if (error)
      return res
        .status(400)
        .json({ status: 400, message: error.details[0].message, result: [] });

    const user = await usersDB
      .findOne({ email: req.body.email })
      .populate({ path: "image" });
    if (!user) {
      return res
        .status(400)
        .json({ status: 400, message: "user not found", result: [] });
    }
    //check password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
      return res
        .status(400)
        .json({ status: 400, message: "Password incorrect", result: [] });

    const { _id, name, email, role, image, ...rest } = user;

    //create token
    const token = jwt.sign(
      { _id, name, email, role, image: image?.imageUrl },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const refreshToken = jwt.sign(
      { _id, name, email, role, image: image?.imageUrl },
      process.env.TOKEN_REFRESH,
      {
        expiresIn: "365d",
      }
    );
    arrRefreshToken.push(refreshToken);
    res.header("auth-token", token);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: false,
      secure: false,
      path: "/",
      sameSite: "strict",
    });

    return res.status(200).json({
      status: 200,
      message: "login success",
      result: {
        token,
        refreshToken,
        data: { _id, name, email, role, image: image?.imageUrl },
      },
    });
  }
};

exports.refreshToken = async (req, res) => {
  if (!req.headers?.cookie) {
    return res
      .status(400)
      .json({ status: 400, message: "You are not authenticated" });
  }
  const refreshToken = req.headers?.cookie.substring(
    req.headers.cookie.indexOf("=") + 1
  );
  if (!refreshToken) {
    return res
      .status(400)
      .json({ status: 400, message: "You are not authenticated" });
  }
  if (!arrRefreshToken.includes(refreshToken))
    return res.status(400).json({ status: 400, message: "Token is not valid" });
  jwt.verify(refreshToken, process.env.TOKEN_REFRESH, (err, user) => {
    if (err) {
      return res.status(400).json({ status: 400, message: err.message });
    }
    const { _id, name, email, role, ...rest } = user;
    arrRefreshToken = arrRefreshToken.filter((token) => token !== refreshToken);
    const newAccessToken = jwt.sign(
      { _id, name, email, role },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const newRefreshToken = jwt.sign(
      { _id, name, email, role },
      process.env.TOKEN_REFRESH,
      {
        expiresIn: "365d",
      }
    );
    arrRefreshToken.push(newRefreshToken);
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: false,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    res.status(200).json({
      status: 200,
      message: "refresh success",
      token: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
};

exports.logout = (req, res) => {
  res.removeHeader("auth-token");
  return res.status(200).json({ status: "200", message: "logout success" });
};
exports.forgotPassword = async (req, res) => {
  // Send Email to email provided but first check if user exists
  const { email } = req.body;

  try {
    const user = await usersDB.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ status: "404", message: "No email could not be sent" });
    }

    // HTML Message
    const message = `
      <h1>You have requested a password reset</h1>
      <h1>Your code: ${code}</h1> 
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      return res
        .status(200)
        .json({ status: 200, message: "Email Sent", email: user.email });
    } catch (err) {
      return res.status(500).json({ status: "500", message: err.message });
    }
  } catch (err) {
    return res.status(500).json({ status: "500", message: err.message });
  }
};

exports.checkOtp = async (req, res) => {
  try {
    if (_.isEmpty(req.body)) {
      return res
        .status(400)
        .json({ status: 400, message: "Content can not be empty" });
    }
    console.log(req.body.code);
    console.log(code);
    console.log(req.body.code != code);
    if (req.body.code != code) {
      return res
        .status(500)
        .json({ status: "500", message: "code is not correct" });
    }
    return res.status(200).json({ status: 200, message: "code is correct" });
  } catch (error) {
    res.status(400).json({ status: 400, message: "code is not correct" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const user = await usersDB.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ status: "404", message: "No email could not found " });
    }

    //validate the password
    const { error } = passwordValidation({ password: req.body.password });
    if (error)
      return res
        .status(400)
        .json({ status: 400, message: error.details[0].message, result: [] });
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
      const data = await usersDB.findByIdAndUpdate(
        user._id,
        { password: hashedPassword },
        {
          useFindAndModify: false,
          new: true,
        }
      );
      return res.status(200).json({
        status: "200",
        message: "change password successfully!",
        result: data,
      });
    } catch (error) {
      return res.status(200).json({
        status: "400",
        message: error.message,
        result: [],
      });
    }
  } catch (err) {
    return res.status(500).json({ status: "500", message: err.message });
  }
};
