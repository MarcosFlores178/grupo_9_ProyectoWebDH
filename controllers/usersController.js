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
    res.render("users/login");
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try { 
    const usuario = await Usuario.findOne({
      where: {email}
    });
    if (!usuario) {
      return res.status(404).json({message: 'Usuario no encontrado'});
      
    }
    console.log(req.body);
    console.log(usuario);
    const validPassword= await bcrypt.compare(password,usuario.password);
    if (!validPassword) {
      return res.status(404).json({message: 'Contraseña incorrecta'});
      
    }

    // this.user = this.userList.find((u) => {
    //   return u.email == email && bcrypt.compareSync(password, u.password);
    // });
    console.log('session:', req.session);
    req.session.user=usuario;
    // req.session.user = this.user;
    if (req.body.remember) {
      res.cookie("remember", usuario.email, { maxAge: 60 * 10000 });
    }
    res.redirect("/users/perfil");
  } catch (error){
    console.error(error);
    return res.status(500).json({message:'Error en el servidor'})
  }
},
  logout: (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
  editarPerfil: (req, res) => {
    const countryList = Object.values(countries).map(country => country.name);
    const usuario = req.session.user;
    res.render("users/editarPerfil", {usuario, countries: countryList, mapsDeError: {} });
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
    const countryList = Object.values(countries).map(country => country.name);
    if(errores.isEmpty()){
      const fotoUsuario = req.file ? `${req.file.filename}` : "/images/users/default.jpg";
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
        tipoUsuario,
        genero,
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
        nombreUsuario,
        email,
        password: bcrypt.hashSync(password, 10),
        tipoUsuario,
        genero,
        fotoPerfil: fotoUsuario,
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
  //     db.Usuario.create(newUser)
  //   .then(() => {
  //     // Redirige o envía una respuesta después de crear el usuario
  //     res.redirect('/usuarios');
  //   })
  //   .catch(error => {
  //     // Manejo de errores al insertar en la base de datos
  //     console.error(error);
  //     if (!res.headersSent) {
  //     res.status(500).send("Error al crear el usuario");
  //     }
  //   });
  //     res.redirect("/users/login");

  //   } else {
  //     if (!res.headersSent) {
  //     return res.render ("users/register", { 
  //       mapsDeError: errores.mapped(),
  //       old: req.body,
        
  //       // arrayDeError: errores.array(),
  //        countries: countryList})
  //   }
  // }
  },
  
  perfil: (req, res) => {
    const usuario = req.session.user;
    console.log('usuario:', usuario);
    res.render("users/perfil", { usuario });
  },
  buscarPerfil: async function (req, res) {
    let usuario = req.session.user || null; // Asigna null si no hay usuario

    // Verifica si el usuario tiene la propiedad admincomp y si es "admin"
    if (usuario && usuario.admincomp === "admin") {
      console.log("administrador:", usuario);
    } else {
      usuario = {};
    }
    try {
      const { id } = req.params;
      
      // Busca el producto en la base de datos por su ID, incluyendo la marca asociada
      const usuarioDB = await Usuario.findByPk(id);
  
      // Si no se encuentra el producto, puedes manejarlo como error o mostrar un mensaje
      if (!usuarioDB) {
        return res.status(404).send('Usuario no encontrado');
      }
  
      // Renderiza la vista con el producto y el usuario
      res.render('users/perfil', { usuario: usuarioDB });
      
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al buscar el producto');
    }
  },
};

module.exports = usersController;
