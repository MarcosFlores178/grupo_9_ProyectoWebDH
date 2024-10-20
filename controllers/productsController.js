const db = require("../database/models");
const fs = require("fs");
const path = require("path");
const { validationResult } = require('express-validator');
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
    const errorMessage = req.flash('ValErrorMessage')[0] || ''; // Recuperar el mensaje de error
    const successMessage = req.flash('successMessage')[0] || ''; // Recuperar el mensaje de éxito
    Promise.all([marcas, talles]).then(([marcas, talles]) => {
      res.render("products/addproduct", { marcas, talles, mapsDeError: {}, errorMessage, successMessage });
    });
  },
  addProduct: async (req, res) => {
    try {
      // Consultas a la base de datos para obtener marcas y talles
      let marcas = db.Marca.findAll();
      let talles = db.Talle.findAll();

      // Validación de errores en el request
      let errores = validationResult(req);
      const imgProduct = req.file ? `${req.file.filename}` : "default.jpg";

      if (errores.isEmpty()) {
        // Si no hay errores, crear el producto
        await db.Producto.create({
          nombre: req.body.nombre,
          descripcion: req.body.descripcion,
          imagen: imgProduct,
          color: req.body.color,
          precio: req.body.precio,
          id_talle: req.body.talle,
          id_marca: req.body.marca,
        });
        // Guardar mensaje de éxito en flash
        req.flash('successMessage', 'Producto creado con éxito.');
        return res.redirect('/products/addproduct'); // Redirigir a la misma página de carga
        // Redirigir al listado de productos
        // return res.redirect("/products");
        // return res.render("products/addproduct", { mapsDeError: {} });
      } else {
        console.log(errores.mapped());
        req.flash('ValErrorMessage', 'Complete los campos requeridos');
        // Si hay errores, realizar las consultas para obtener marcas y talles
        let [marcasResult, tallesResult] = await Promise.all([marcas, talles]);
        const errorMessage = req.flash('ValErrorMessage')[0] || '';
        // Renderizar la vista de agregar producto con los errores, los datos viejos y las listas de marcas y talles
        return res.render("products/addproduct", {
          marcas: marcasResult,
          talles: tallesResult,
          mapsDeError: errores.mapped(),
          old: req.body,
          errorMessage // Datos ingresados para que el formulario no se reinicie
        });
      }
    } catch (error) {
      console.error(error);
      req.flash('ValErrorMessage', 'Ocurrió un error. Intente nuevamente');
      return res.render("products/addproduct");

      // return res.status(500).send('Error al procesar la solicitud');
    }
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
        res.render("products/editproduct", { producto, marcas, talles, mapsDeError: {} });
      }
    );
  },
  // editProduct: (req, res) => {
  //   try {
  //     // Consultas a la base de datos para obtener marcas y talles
  //     let marcas = db.Marca.findAll();
  //     let talles = db.Talle.findAll();
  //      // Validación de errores en el request
  //      let errores = validationResult(req);
  //     //  const imgProduct = req.file ? `${req.file.filename}` : "default.jpg";
  //   let imgProduct = "";
  //   if (req.file?.filename) {
  //     imgProduct = `${req.file.filename}`;
  //   } else {
  //     imgProduct = req.body.currentImage;
  //   }
  //   const { id } = req.params;
  //   if (errores.isEmpty()) {
  //     // Si no hay errores, crear el producto
  //     // await db.Producto.update(
  //       db.Producto.update(
  //     {
  //       nombre: req.body.nombre,
  //       descripcion: req.body.descripcion,
  //       imagen: imgProduct,
  //       color: req.body.color,
  //       precio: req.body.precio,
  //       id_talle: req.body.talle,
  //       id_marca: req.body.marca,
  //     },
  //     {
  //       where: { id: id },
  //     }
  //   )
  //     // .then(() => { //aca no puede ir then porque no hay promesas, es un metodo sincronico 
  //       res.redirect(`/products/detail/${id}`);
  //     // })
  //   } else {  

  //     console.log(errores.mapped());
  //     // Si hay errores, realizar las consultas para obtener marcas y talles
  //     let [marcasResult, tallesResult] = Promise.all([marcas, talles]);

  //     // Renderizar la vista de agregar producto con los errores, los datos viejos y las listas de marcas y talles
  //     return res.render("products/addproduct", {
  //         marcas: marcasResult,
  //         talles: tallesResult,
  //         mapsDeError: errores.mapped(),
  //         old: req.body,  // Datos ingresados para que el formulario no se reinicie
  //     });
  //   }
  // }
  //     catch(error) {
  //       console.error(error);
  //       return res.status(500).send('Error al procesar la solicitud');
  //     }
  // },
  editProduct: async (req, res) => {
    try {
      // Consultas a la base de datos para obtener marcas y talles (await porque son operaciones asincrónicas)
      let marcas = await db.Marca.findAll();
      let talles = await db.Talle.findAll();

      // Validación de errores en el request
      let errores = validationResult(req);
      console.log(errores);
      // Manejo de imagen del producto
      let imgProduct = req.file?.filename ? `${req.file.filename}` : req.body.currentImage;

      const { id } = req.params;
      let producto = await db.Producto.findByPk(id);
      if (errores.isEmpty()) {
        console.log('dentro del if errores is empty');
        // Si no hay errores, actualizar el producto
        await db.Producto.update(
          {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            imagen: imgProduct,
            color: req.body.color,
            precio: req.body.precio,
            id_talle: req.body.talle,
            id_marca: req.body.marca,
          },
          { where: { id: id } }
        );
        console.log('objeto producto', producto);
        // Redirigir a la vista de detalle del producto actualizado
        res.redirect(`/products/detail/${id}`);
      } else {
        // Si hay errores, renderizar la vista de edición con errores y datos viejos
        return res.render("products/editproduct", {
          producto: producto,
          marcas: marcas,
          talles: talles,
          mapsDeError: errores.mapped(),
          old: req.body, // Datos ingresados para que el formulario no se reinicie
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error al procesar la solicitud");
    }
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
  searchProduct: async (req, res) => {
    const query = req.query.query;
    try {
      const productos = await db.Producto.findAll({
        where: {
          nombre: {
            [Sequelize.Op.like]: `%${query}%`
          }
        }
      });
      res.render('products/resultadosBusqueda', { productos, query })
    } catch (error) {
      console.error('Error en la busqueda', error);
      res.status(500).send('Error en la busqueda')
    }

  },
  menuSearch: async (req, res) => {
    try {
      const categoria = req.params.id;
      const productos = await db.Producto.findAll({
        where: { id_categoria: categoria }
      });

      res.sender('productosPorCategoria', { productos })

    } catch { error }
  }
};
module.exports = productsController;
