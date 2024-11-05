const mainController = {
  showIndex: (req, res) => {
    let usuario = null;
    // console.log(usuario);
    if (req.session.user) {
      usuario = req.session.user;
      return res.render("main/index", { usuario });
    } else {
      usuario = false;
      return res.render("main/index", { usuario });
      // return res.render("main/index");
    }
  },
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
  
};

module.exports = mainController;
