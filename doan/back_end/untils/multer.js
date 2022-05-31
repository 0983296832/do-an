const multer = require("multer");
const path = require("path");

// Multer config
const storage = multer.diskStorage({
  // destination: path.join(__dirname, "public/uploads"),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});
const upload = multer({ storage }).single("image");
const uploads = multer({ storage }).array("image", 5);
module.exports = { upload, uploads };
