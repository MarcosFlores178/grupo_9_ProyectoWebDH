const express = require("express");
const productsController = require("../controllers/productsController");
const router = express.Router();
const fileUpload = require("../service/fileUpload");
// router.get("/details-product", (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'details-product.ejs'));
// });

// router.get("/shopping-cart", (req, res) =>{
//    res.sendFile(path.resolve(__dirname,'shopping-cart.ejs'));
// });

router.get("/shop-cart", productsController.showShopCart);

router.get("/", productsController.showAll);

// router.get("/details-product", productsController.showDetails);

router.get("/detail/:id", productsController.showById);

router.get("/addproduct/", productsController.showAddProduct);

router.post("/", fileUpload.single("image"), productsController.addProduct);

router.get("/editproduct/:id", productsController.showEditForm);

router.put(
  "/detail/:id",
  fileUpload.single("image"),
  productsController.editProduct
);

router.delete("/detail/:id", productsController.deleteProduct);

module.exports = router;
