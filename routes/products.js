const express = require("express");
const productsController = require("../controllers/productsController");
const router = express.Router();

// router.get("/details-product", (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'details-product.ejs'));
// });

// router.get("/shopping-cart", (req, res) =>{
//    res.sendFile(path.resolve(__dirname,'shopping-cart.ejs'));
// });

router.get("/details-product", productsController.showDetails);

router.get("/shop-cart", productsController.showShopCart);

router.get("/addproduct", productsController.showAddProduct);

router.get("/", productsController.showAll);

module.exports = router;
