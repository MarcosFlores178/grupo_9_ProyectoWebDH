const fs = require("fs");
const path = require("path");
const productosFile = path.join(__dirname, "../data/products.json");
const productos = JSON.parse(fs.readFileSync(productosFile, "utf-8"));

const productsController = {
  showDetails: (req, res) => {
    res.render("products/details-product");
  },

  showShopCart: (req, res) => {
    res.render("products/shop-cart");
  },

  showAddProduct: (req, res) => {
    res.render("products/addproduct");
  },
  showAll: (req, res) => {
    res.render("products/productos", { productos });
  },
};
module.exports = productsController;
