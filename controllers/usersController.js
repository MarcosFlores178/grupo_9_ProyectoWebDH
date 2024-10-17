const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const { countries } = require('countries-list');
const bcrypt = require("bcryptjs");
const usersDataSource = require("../service/usersDataSource");
const db = require('../database/models'); // Asegúrate de que esta ruta sea correcta
const Producto = db.Producto;
const Marca = db.Marca;
const Usuario = db.Usuario;
const Talle = db.Talle;
const usersController = {
  userList: null,
  user: null,
  showLogin: (req, res) => {
    usuario = req.session.user
    res.render("users/login", {usuario});
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const usuario = await Usuario.findOne({
        where: { email }
      });
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });

      }
      console.log(req.body);
      console.log(usuario);
      const validPassword = await bcrypt.compare(password, usuario.password);
      if (!validPassword) {
        return res.status(404).json({ message: 'Contraseña incorrecta' });

      }
      req.session.user = usuario;
      console.log('session:', req.session);
      if (req.body.remember) {
        res.cookie("remember", usuario.email, { maxAge: 60 * 10000 });
      }
      res.redirect("/users/perfil");
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error en el servidor' })
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.redirect("/");
  },
  showRegister: (req, res) => {
    // res.render("users/register");
    const countryList = Object.values(countries).map(country => country.name);
    // let errores = validationResult(req);
    // mapsDeError = undefined;
    res.render('users/register', { countries: countryList, mapsDeError: {} });
  },
  register: async (req, res) => {
    let errores = validationResult(req);
    const countryList = Object.values(countries).map(country => country.name); //Lo que esta linea hace es que toma el objeto countries y lo convierte en un array con los nombres de los paises. Y eso se guarda en la variable countryList. Y el objeto countries se encuentra en la libreria countries-list.
    if (errores.isEmpty()) {
      const fotoUsuario = req.file ? `${req.file.filename}` : "default.jpg";
      const {
        nombre,
        apellido,
        dni,
        telefono,
        domicilio,
        country,
        nombreUsuario,
        email,
        password,
        admincomp,
        tipoUsuario,
        foto,
      } = req.body;
      const newUser = {
        // id: uuidv4(),
        // id: crypto.randomUUID(),
        nombre,
        apellido,
        dni,
        telefono,
        domicilio,
        pais: country,
        nombre_usuario: nombreUsuario,
        email,
        password: bcrypt.hashSync(password, 10),
        tipo_usuario: admincomp,
        genero: tipoUsuario,
        foto_perfil: fotoUsuario,
      };
      // Intenta crear el nuevo usuario
      try {
        await db.Usuario.create(newUser);
        res.redirect('/users/login'); // Redirige después de la creación exitosa
      } catch (error) {
        console.error(error);
        if (!res.headersSent) {
          res.status(500).send("Error al crear el usuario");
        }
      }

    } else {
      // Si hay errores de validación, renderiza el formulario con los errores
      return res.render("users/register", {
        mapsDeError: errores.mapped(),
        old: req.body,
        countries: countryList
      });
    }

  },
  perfil: (req, res) => {
    const usuario = req.session.user; // Obtén el usuario de la sesión
    if (!usuario) {
      return res.redirect('/users/login'); // Redirige si no hay usuario logueado
    }
    res.render("users/userPerfil", { usuario }); // Pasa el usuario a la vista
  },
  showEdit: (req, res) => {
    const countryList = Object.values(countries).map(country => country.name);
    const usuario = req.session.user;
    res.render("users/editarPerfil", { usuario, countries: countryList, mapsDeError: {} });
  },
  showEditCuenta: (req, res) => {
    // const countryList = Object.values(countries).map(country => country.name);
    const usuario = req.session.user; //Aca en esta linea lo que se hace es traer el usuario de la session, porque dentro del usuario están los datos que se quieren editar. Y la session user toma los datos de la base de datos. Y esa asignacion de datos se realiza cuando el usuario se loguea.
    res.render("users/editarCuenta", { usuario, mapsDeError: {} });
  },
  editUser: async (req, res) => {
    try{
    let image = "";
    let errores= validationResult(req);
    const countryList = Object.values(countries).map(country => country.name); 
    const { nombre,
      apellido,
      dni,
      telefono,
      domicilio,
      country,
      tipoUsuario } = req.body;

    // Verificar si hay una nueva imagen cargada
    if (req.file?.filename) {
      image = req.file.filename;
    } else {
      image = req.body.currentImage;
    }

    const { id } = req.params;
    let usuario = await db.Usuario.findByPk(id);
    if (errores.isEmpty()) {
      // Buscar el producto por ID y actualizar los campos
      await db.Usuario.update(
        {
          nombre,
          apellido,
          dni,
          telefono,
          domicilio,
          pais: country,
          genero: tipoUsuario,
          foto_perfil: image
        },
        { where: { id } } // Condición para encontrar el producto por ID
      );
      //ACTUALIZA LA SESSION CON LOS NUEVOS DATOS EDITADOS
      const userUpdated = await Usuario.findByPk(id); // Consulta los datos actualizados
      req.session.user = userUpdated;
      // console.log(req.body);
      //res.redirect(`/users/perfil/${id}`);
      res.redirect(`/users/perfil`);
    } else {
      // Si hay errores, renderizar la vista de edición con errores y datos viejos
      return res.render("users/editarPerfil", {
        usuario: usuario,
        mapsDeError: errores.mapped(),
        old: req.body, // Datos ingresados para que el formulario no se reinicie
        countries: countryList
      });
    }
    } catch (error) {
      console.error("Error al actualizar el usuario: ", error);
      res.status(500).send("Error al actualizar el usuario");
    }
  },
  editCuenta: async (req, res) => {
    
    const { nombreUsuario,
      email,
      admincomp,
      password
     } = req.body;

    const { id } = req.params;
    
     console.log('console log de params', req.params);
     console.log('console log de body', req.body);
    try {
      // Buscar el producto por ID y actualizar los campos
      await db.Usuario.update(
        {
          nombre_usuario:nombreUsuario,
          email,
          tipo_usuario: admincomp,
          password
          
        },
        { where: { id } } // Condición para encontrar el producto por ID
      );
      //ACTUALIZA LA SESSION CON LOS NUEVOS DATOS EDITADOS
      const userUpdated = await Usuario.findByPk(id); // Consulta los datos actualizados
      req.session.user = userUpdated;
      console.log(req.body);
      //res.redirect(`/users/perfil/${id}`);
      res.redirect(`/users/perfil`);
    } catch (error) {
      console.error("Error al actualizar el usuario: ", error);
      res.status(500).send("Error al actualizar el usuario");
    }
  }

};

module.exports = usersController;
