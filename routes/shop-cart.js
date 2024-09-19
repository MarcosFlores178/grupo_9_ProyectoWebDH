const express = require("express");
// const productsController = require("../controllers/productsController");
const shopCartController = require("../controllers/shopCartController");
const router = express.Router();
const fileUpload = require("../service/fileUpload");
const userMiddleware = require("../middlewares/userMiddleware.js");
const adminMiddleware = require("../middlewares/adminMiddleware.js");
// router.get("/details-product", (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'details-product.ejs'));
// });

// router.get("/shopping-cart", (req, res) =>{
//    res.sendFile(path.resolve(__dirname,'shopping-cart.ejs'));
// });

router.get("/shop-cart", userMiddleware, shopCartController.showShopCart);
router.post("/add", userMiddleware, shopCartController.addShopCart);




module.exports = router;