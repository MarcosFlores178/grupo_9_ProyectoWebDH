const db = require("../database/models");
const fs = require("fs");
const path = require("path");
const dataSource = require("../service/dataSource.js");
const { Sequelize } = require("sequelize");
const productsController = {
  productsList: null,
  showDetails: (req, res) => {
    db.Producto.findbyPk(req.param).then((producto) => {
      return res.render("products/details-product", { producto, usuario });
    });
  },
  showShopCart: (req, res) => {
    if (req.session.user) {
      const usuario = req.session.user;
      res.render("products/shop-cart", { usuario });
    }
  },
  // showAll: async (req, res) => {
  //   let usuario = req.session.user || null; 
  //   if (usuario) {
  //   } else {
  //     usuario = {};
  //   }
  //   console.log(usuario);

  //   db.Producto.findAll().then((productos) => {
  //     return res.render("products/productos", { productos, usuario });
  //   });
    
  // },
  showAll: async (req, res) => {
    try {
      // Obtener todos los productos de la base de datos
      const productos = await db.Producto.findAll({
        include: {
          model: db.Marca, //Acá se pone el modelo, o sea el return que se envia desde el modelo Marca
          as: 'marca',  // Alias que definimos en la asociación
          attributes: ['descripcion'] // Solo traer el nombre de la marca
        }
      // {   model: Talle,
      //   as: 'talles',  // Alias que definimos en la asociación
      //   attributes: ['talle'] 
      //  }
      
      });
  
      // Renderizar la vista y pasar los productos
      res.render('products/productos', { productos });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al cargar los productos');
    }
  },
  showById: async function (req, res) {
    let usuario = req.session.user || null; // Asigna null si no hay usuario

    // Verifica si el usuario tiene la propiedad admincomp y si es "admin"
    if (usuario && usuario.tipo_usuario === "admin") {
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
    const imgProduct = req.file ? `${req.file.filename}` : "default.jpg";
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
  searchProduct: async (req, res )=>{
    const query = req.query.query;
    try {
      const productos = await db.Producto.findAll({
        where:{
          nombre: {
            [Sequelize.Op.like]: `%${query}%`
          }
        }
      });
      res.render('products/resultadosBusqueda', {productos, query})
    }catch (error){
      console.error('Error en la busqueda', error);
      res.status(500).send('Error en la busqueda')
    }

  },
  menuSearch: async (req, res)=> {
    try {
    const categoria=req.params.id;
    const productos= await db.Producto.findAll({
      where: {id_categoria:categoria}
    });

    res.sender('productosPorCategoria', {productos})

  }catch{error}
}
};
module.exports = productsController;
