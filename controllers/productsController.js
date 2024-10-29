const db = require("../database/models");
const fs = require("fs");
const path = require("path");
const { validationResult } = require('express-validator');
const dataSource = require("../service/dataSource.js");
const { Sequelize } = require("sequelize");
const { Op } = require('sequelize'); 
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
let successMessage = req.flash('successMessage')[0] || '';
      // Renderizar la vista y pasar los productos
      res.render('products/productos', { productos, successMessage });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al cargar los productos');
    }
  },
  showById: async function (req, res) {
    let usuario = req.session.user || null; // Asigna null si no hay usuario
    let successMessage = req.flash('successMessage')[0] || '';
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
        successMessage
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

  showAddProduct : async (req, res) => {
    try {
      // Consultas a la base de datos para obtener marcas y talles
    let marcas = db.Marca.findAll();
    let talles = db.Talle.findAll();
  //   const categoriasPrincipales = await db.Categoria.findAll({
  //     where: { parent_id: null },
  //     include: {
  //         model: db.Categoria, //esta es la linea 122
  //         as: 'subcategoria'
  //     }

  // });
  const categoriasPrincipales = await db.Categoria.findAll({
    where: {parent_id: null, nivel: 1 },
    include: {
        model: db.Categoria,
        as: 'subcategoria',
        where: { nivel: 2 },
        required: false, // Hacer opcional en caso de que alguna categoría no tenga subcategorías
        include: {
            model: db.Categoria,
            as: 'tiposProducto', // Esto representa el nivel de tipo de producto
            where: { nivel: 3 },
            required: false
        }
    }
});

    const errorMessage = req.flash('ValErrorMessage')[0] || ''; // Recuperar el mensaje de error
    const successMessage = req.flash('successMessage')[0] || ''; // Recuperar el mensaje de éxito
    Promise.all([marcas, talles]).then(([marcas, talles]) => {
      res.render("products/addproduct", { marcas, talles, mapsDeError: {}, errorMessage, successMessage, categoriasPrincipales });
    });
  } catch (error) {
    console.error("Error obteniendo las categorías:", error);
    res.status(500).send("Hubo un error al cargar las categorías.");
}
  },
  
  addProduct: async (req, res) => {
    try {
      // Consultas a la base de datos para obtener marcas y talles
      let marcas = db.Marca.findAll();
      let talles = db.Talle.findAll();

      // Validación de errores en el request
      let errores = validationResult(req);
      const imgProduct = req.file ? `${req.file.filename}` : "default.jpg";
      const { nombre, descripcion, color, precio, marca, tipoProducto, talle } = req.body;

      if (errores.isEmpty()) {
        // Si no hay errores, crear el producto
        await db.Producto.create({
          nombre,
          descripcion,
          imagen: imgProduct,
          color,
          precio,
          id_categoria: tipoProducto,
          id_marca: marca,
          id_talle: talle
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
        const successMessage = req.flash('successMessage')[0] || ''; // Recuperar el mensaje de éxito
        // Renderizar la vista de agregar producto con los errores, los datos viejos y las listas de marcas y talles
        return res.render("products/addproduct", {
          marcas: marcasResult,
          talles: tallesResult,
          mapsDeError: errores.mapped(),
          old: req.body,
          errorMessage, // Datos ingresados para que el formulario no se reinicie
          successMessage
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
    const errorMessage = req.flash('ValErrorMessage')[0] || ''; // Recuperar el mensaje de error
    const successMessage = req.flash('successMessage')[0] || ''; // Recuperar el mensaje de éxito
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
        res.render("products/editproduct", { producto, marcas, talles, mapsDeError: {}, errorMessage, successMessage });
      }
    );
  },
  
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
        // const { id } = req.params;
        console.log('objeto producto', producto);
        req.flash('successMessage', 'Producto editado con éxito.');
        // Redirigir a la vista de detalle del producto actualizado
        return res.redirect(`/products/detail/${id}`);
      } else {
        console.log(errores.mapped());
        req.flash('ValErrorMessage', 'Complete los campos requeridos');
        const errorMessage = req.flash('ValErrorMessage')[0] || '';
        const successMessage = req.flash('successMessage')[0] || ''; // Recuperar el mensaje de éxito
        // Si hay errores, renderizar la vista de edición con errores y datos viejos
        return res.render("products/editproduct", {
          producto: producto,
          marcas: marcas,
          talles: talles,
          mapsDeError: errores.mapped(),
          old: req.body,
          successMessage,
          errorMessage // Datos ingresados para que el formulario no se reinicie


        });
      }
    } catch (error) {
      console.error(error);
      req.flash('ValErrorMessage', 'Ocurrió un error. Intente nuevamente');
      // return res.status(500).send("Error al procesar la solicitud");
      return  res.redirect(`/products/detail/${id}`);
    }
  },
  
    // Método para listar productos por categoría principal
    listarPorCategoria: async (req, res) => {
        try {
            const categoriaNombre = req.params.categoria; // Ej. "Hombre", "Mujer"
            
            // Buscar los productos de la categoría principal
            const productos = await db.Producto.findAll({
                include: [
                    {
                        model: db.Categoria,
                        as: 'categoria',
                        required: true,
                        // where: { categoria: categoriaNombre }
                    }
                ]
            });

            res.render('products/productoscat', { productos });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al obtener los productos');
        }
    },

    // Método para listar productos por subcategoría
    listarPorSubcategoria: async (req, res) => {
        try {
            const subcategoriaId = req.params.subcategoriaId; 

            // Buscar productos que pertenezcan a esta subcategoría
            const productos = await db.Producto.findAll({
                include: [
                    {
                        model: db.Categoria,
                        as: 'subcategoria',
                        where: { id: subcategoriaId }
                    }
                ]
            });

            res.render('productos', { productos });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al obtener los productos');
        }
    },

    // Método para listar productos por tipo de producto
    listarPorTipo: async (req, res) => {
        try {
            const tipoId = req.params.tipoId;

            const productos = await db.Producto.findAll({
                where: { categoria_id: tipoId }
            });

            res.render('productos', { productos });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al obtener los productos');
        }
    },
  mostrarProductos: async (req, res)=> {
    try {
      const { categoriaId } = req.query; // Obtenemos el ID de categoría seleccionada
      const categoriaSeleccionadaId = Number(categoriaId); // Convertimos a número

      // Buscamos la categoría seleccionada en la base de datos
      const categoriaSeleccionada = await db.Categoria.findByPk(categoriaSeleccionadaId);

      // Si no se encuentra la categoría, mostramos todos los productos
      if (!categoriaSeleccionada) {
          // Asumiendo que `productos` está disponible en el contexto, quizás desde una consulta previa
          const productos = await db.Producto.findAll(); // Obtiene todos los productos
          return res.render('products/productoscat', { productos });
      }

      let productosFiltrados = [];

      // Caso 1: Si es una categoría principal
      if (categoriaSeleccionada.nivel === 1) {
        if (categoriaSeleccionada.nivel === 1) {
          const subcategorias = await db.Categoria.findAll({ where: { parent_id: categoriaSeleccionadaId } });
          const subcategoriasIds = subcategorias.map(sub => sub.id);
          const tiposProductos = await db.Categoria.findAll({ where: { parent_id: subcategoriasIds } });
          const tiposProductosIds = tiposProductos.map(tipo => tipo.id);
          

          productosFiltrados = await db.Producto.findAll({
              where: {
                  [Op.or]: [
                      { id_categoria: subcategoriasIds },
                      { id_categoria: categoriaSeleccionadaId },
                      { id_categoria: tiposProductosIds },
                  ]
              }
          });
      }
      // Caso 2: Si es una subcategoría
      else if (categoriaSeleccionada.nivel === 2) {
          const tiposProductos = await db.Categoria.findAll({ where: { parent_id: categoriaSeleccionadaId } });
          const tiposProductosIds = tiposProductos.map(tipo => tipo.id);

          productosFiltrados = await db.Producto.findAll({
              where: {
                  [Op.or]: [
                      { id_categoria: categoriaSeleccionadaId },
                      { id_categoria: tiposProductosIds }
                  ]
              }
          });
      }
      // Caso 3: Si es un tipo de producto específico
      else if (categoriaSeleccionada.nivel === 3) {
          productosFiltrados = await db.Producto.findAll({ where: { id_categoria: categoriaSeleccionadaId } });
      }

      // Enviamos los productos filtrados a la vista
      res.render('products/productoscat', { productos: productosFiltrados });
  } catch (error) {
      console.error("Error al mostrar productos:", error);
      res.status(500).send("Ocurrió un error al procesar la solicitud.");
  }
  },
  
    showMenu: async (req, res) => {
        try {
            const categorias = await db.Categoria.findAll();
            res.render('partials/navbar', { categorias });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al cargar las categorías');
        }
      },
  showDelete: (req, res) => {
    let usuario = req.session.user || null; // Asigna null si no hay usuario
    const errorMessage = req.flash('ValErrorMessage')[0] || ''; // Recuperar el mensaje de error
    const successMessage = req.flash('successMessage')[0] || ''; // Recuperar el mensaje de éxito
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
        errorMessage,
        successMessage
      });
    });
  },
  deleteProduct: async (req, res) => {
    let productId = req.params.id;
    db.Producto.destroy({ where: { id: productId }, force: true }) // force: true es para asegurar que se ejecute la acción
      .then(() => {
        req.flash('successMessage', 'Producto eliminado con éxito.');
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
