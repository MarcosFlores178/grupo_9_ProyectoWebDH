const {validationResult} = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const { countries } = require('countries-list');
const usersDataSource = require("../service/usersDataSource");
const usersController = {
  userList: null,
  user: null,
  showLogin: (req, res) => {
    res.render("users/login");
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    this.userList = await usersDataSource.load();
    this.user = this.userList.find((u) => {
      return u.email == email && u.password == password;
    });
    req.session.user = this.user;
    res.redirect("/users/perfil");
  },
  showRegister: (req, res) => {
    // res.render("users/register");
    const countryList = Object.values(countries).map(country => country.name);
            res.render('users/register', { countries: countryList });
  },
  register: async (req, res) => {
    let errores = validationResult(req);
    if(!errores.isEmpty()){
      return res.render ("register", { mensajesDeError: errores.mapped()})
    }
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
      id: uuidv4(),
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
      foto: fotoUsuario,
    };
    console.log(newUser);
    this.userList = await usersDataSource.load();
    this.userList.push(newUser);
    await usersDataSource.save(this.userList);
    console.log(newUser);
    res.redirect("/users/login");
  },
  perfil: (req, res) => {
    const usuario = req.session.user;
    res.render("users/userPerfil", { usuario });
  },
};

module.exports = usersController;
