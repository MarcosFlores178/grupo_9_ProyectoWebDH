const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");
const usersDataSource = require("../service/usersDataSource");
const usersController = {
  userList: null,
  user: null,
  showLogin: (req, res) => {
    res.render("users/login");
  },
  login: async (req, res) => {
    res.redirect("/users/perfil");
  },
  showRegister: (req, res) => {
    res.render("users/register");
  },
  register: async (req, res) => {
    const fotoUsuario = req.file
      ? `${req.file.filename}`
      : "/images/users/userDefault.jpg";
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
      foto,
    } = req.body;
    const newUser = {
      id: crypto.randomUUID(),
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
    delete req.session.user;
    res.render("users/userPerfil", { usuario: this.user });
  },
};

module.exports = usersController;
