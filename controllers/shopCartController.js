const fs = require("fs");
const path = require("path");
const dataSource = require("../service/dataSource.js");
// const Producto = require('../database/models/Producto');
// const Marca = require('../database/models/Marca'); 
// const Talle = require('../database/models/Talle'); 
const db = require('../database/models'); // Asegúrate de que esta ruta sea correcta
const Producto = db.Producto;
const Marca = db.Marca;
const Talle = db.Talle;
const productsController = {
//   productsList: null,
//   showDetails: (req, res) => {
//     res.render("products/details-product");
//   },
  showShopCart: (req, res) => {
    if (req.session.user) {
      const usuario = req.session.user;
      res.render("products/shop-cart", { usuario });
    }
  },
  addShopCart: (req, res) => {
    if (req.session.user) {
      const usuario = req.session.user;
      res.render("products/shop-cart", { usuario });
    }
  },

};
module.exports = productsController;
