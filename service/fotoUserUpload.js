const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = path.resolve(__dirname, "../public/images/users");
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const randomString = crypto.randomBytes(8).toString("hex");
    const extension = path.extname(file.originalname);
    const imagen = "user-" + randomString + extension;
    cb(null, imagen);
  },
});
const fotoUserUpload = multer({ storage });
module.exports = fotoUserUpload;
