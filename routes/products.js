const express = require("express");
const productsController = require("../controllers/productsController");
const router = express.Router();
const fileUpload = require("../service/fileUpload");
const {body, check}=require("express-validator");

const userMiddleware = require("../middlewares/userMiddleware.js");
const adminMiddleware = require("../middlewares/adminMiddleware.js");
// router.get("/details-product", (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'details-product.ejs'));
// });

// router.get("/shopping-cart", (req, res) =>{
//    res.sendFile(path.resolve(__dirname,'shopping-cart.ejs'));
// });

const validator = [
  body('nombre').notEmpty().trim().isLength({ min: 2}).withMessage('Ingrese el nombre del producto'),
  body('descripcion').notEmpty().trim().isLength({ min: 20}).withMessage('Ingrese la descripción del producto'),
  body('color').notEmpty().trim().withMessage('Ingrese el color'),
  body('precio').isDecimal().trim().withMessage('Ingrese el precio'),
  body('marca').notEmpty().trim().withMessage('Ingrese su marca'),
  body('talle').notEmpty().trim().withMessage('Ingrese el talle'),
  check('admincomp')
  .exists().withMessage('Seleccione un rol')
  .bail()
  // .custom((value, { req }) => {
  //     if (!req.body.role || !Array.isArray(req.body.role) || req.body.role.length !== 1) {
  //         throw new Error('Seleccione un rol válido');
  //     }
  //     return true;
  // })
    ] 

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
  validator,
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
