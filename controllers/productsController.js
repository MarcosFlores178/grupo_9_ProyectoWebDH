const db = require("../database/models");
const fs = require("fs");
const path = require("path");
const dataSource = require("../service/dataSource.js");
const productsController = {
  productsList: null,
  showDetails: (req, res) => {
    db.Producto.findbyPk(req.param).then((producto) => {
      return res.render("products/details-product", { producto });
    });
  },
  showShopCart: (req, res) => {
    if (req.session.user) {
      const usuario = req.session.user;
      res.render("products/shop-cart", { usuario });
    }
  },
  showAll: async (req, res) => {
    db.Producto.findAll().then((productos) => {
      return res.render("products/productos", { productos });
    });
    // this.productsList = await dataSource.load();
    // res.render("products/productos", { productos: this.productsList });
  },
  showById: async function (req, res) {
    let usuario = req.session.user || null; // Asigna null si no hay usuario

    // Verifica si el usuario tiene la propiedad admincomp y si es "admin"
    if (usuario && usuario.admincomp === "admin") {
      console.log("administrador:", usuario);
    } else {
      usuario = {};
    }
    db.Producto.findByPk(req.params.id, {
      include: [
        {
          model: db.Talle,
          atributes: ["descripcion"],
          as: "talle",
        },
        {
          model: db.Marca,
          atributes: ["descripcion"],
          as: "marca",
        },
      ],
    }).then((producto) => {
      return res.render("products/details-product", {
        producto,
        usuario,
      });
    });
  },
  showBrand: async (req, res) => {
    const { brand } = req.params.brand;
    this.productsList = await dataSource.load();
    res.render("products/brands", {
      productos: this.productsList,
      brand: brand,
    });
    console.log(this.productsList);
  },

  showAddProduct: (req, res) => {
    let marcas = db.Marca.findAll();
    let talles = db.Talle.findAll();
    Promise.all([marcas, talles]).then(([marcas, talles]) => {
      res.render("products/addproduct", { marcas, talles });
    });
  },
  addProduct: async (req, res) => {
    const imgProduct = req.file
      ? `${req.file.filename}`
      : "/images/products/default.jpg";
    db.Producto.create({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      imagen: imgProduct,
      color: req.body.color,
      precio: req.body.precio,
      id_talle: req.body.talle,
      id_marca: req.body.marca,
    }).then(() => {
      res.redirect("/products");
    });
  },
  showEditForm: (req, res) => {
    let marcas = db.Marca.findAll();
    let talles = db.Talle.findAll();
    const producto = db.Producto.findByPk(req.params.id, {
      include: [
        {
          model: db.Talle,
          atributes: ["id", "descripcion"],
          as: "talle",
        },
        {
          model: db.Marca,
          atributes: ["id", "descripcion"],
          as: "marca",
        },
      ],
    });
    Promise.all([marcas, talles, producto]).then(
      ([marcas, talles, producto]) => {
        res.render("products/editproduct", { producto, marcas, talles });
      }
    );
  },
  editProduct: (req, res) => {
    let imgProduct = "";
    if (req.file?.filename) {
      imgProduct = `${req.file.filename}`;
    } else {
      imgProduct = req.body.currentImage;
    }
    const { id } = req.params;

    db.Producto.update(
      {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        imagen: imgProduct,
        color: req.body.color,
        precio: req.body.precio,
        id_talle: req.body.talle,
        id_marca: req.body.marca,
      },
      {
        where: { id: id },
      }
    )
      .then(() => {
        res.redirect(`/products/detail/${id}`);
      })
      .catch((error) => res.send(error));
  },
  showDelete: (req, res) => {
    let usuario = req.session.user || null; // Asigna null si no hay usuario

    // Verifica si el usuario tiene la propiedad admincomp y si es "admin"
    if (usuario && usuario.admincomp === "admin") {
      console.log("administrador:", usuario);
    } else {
      usuario = {};
    }
    const pedidoProducto = db.Producto.findByPk(req.params.id, {
      include: [
        {
          model: db.Talle,
          atributes: ["descripcion"],
          as: "talle",
        },
        {
          model: db.Marca,
          atributes: ["descripcion"],
          as: "marca",
        },
      ],
    }).then((producto) => {
      return res.render("products/showDelete", {
        producto,
        usuario,
      });
    });
  },
  deleteProduct: async (req, res) => {
    let productId = req.params.id;
    db.Producto.destroy({ where: { id: productId }, force: true }) // force: true es para asegurar que se ejecute la acción
      .then(() => {
        return res.redirect("/products");
      })
      .catch((error) => res.send(error));
  },
};
module.exports = productsController;
