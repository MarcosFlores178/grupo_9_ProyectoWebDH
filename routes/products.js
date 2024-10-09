const express = require("express");
const productsController = require("../controllers/productsController");
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

router.get("/shop-cart", userMiddleware, productsController.showShopCart);

router.get("/", productsController.showAll);

// router.get("/details-product", productsController.showDetails);

// router.get("/brands/:brand", productsController.showBrand);

router.get("/detail/:id", productsController.showById);

router.get("/addproduct/", adminMiddleware, productsController.showAddProduct);

router.get('/search', productsController.searchProduct);

router.get('/search-menu', productsController.menuSearch);

router.post(
  "/",
  fileUpload.single("imagen"),
  adminMiddleware,
  productsController.addProduct
);

router.get(
  "/editproduct/:id",
  adminMiddleware,
  productsController.showEditForm
);

router.put(
  "/detail/:id",
  fileUpload.single("imagen"),
  adminMiddleware,
  productsController.editProduct
);

router.get("/showDelete/:id", adminMiddleware, productsController.showDelete);

router.delete(
  "/deleteProduct/:id",
  adminMiddleware,
  productsController.deleteProduct
);

module.exports = router;
