require("dotenv").config({ path: "./config.env" });
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const { upload, uploads } = require("./untils/multer");

const cors = require("cors");
const connectDB = require("./database/connect");

//PORT
const PORT = process.env.PORT || 5000;

//connect database
connectDB();

//midleware
app.use(uploads);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/auth", require("./routes/auth-route/authRoute"));
app.use("/user", require("./routes/user-route/userRoute"));
app.use("/product", require("./routes/product-route/productRoute"));
app.use("/order", require("./routes/order-route/orderRoute"));

app.listen(PORT, () => {
  console.log(`server run on http://localhost:${PORT}`);
});
