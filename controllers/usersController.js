const bcrypt = require("bcryptjs");
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
      return u.email == email && bcrypt.compareSync(password, u.password);
    });
    req.session.user = this.user;
    if (req.body.remember != undefined) {
      res.cookie("remember", this.user.email, { maxAge: 120 * 1000 });
    }
    res.redirect("/users/perfil");
  },
  logout: (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
  showRegister: (req, res) => {
    res.render("users/register");
  },
  register: async (req, res) => {
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
      id: crypto.randomUUID(),
      nombre,
      apellido,
      dni,
      telefono,
      domicilio,
      country,
      nombreUsuario,
      email,
      password: bcrypt.hashSync(password, 10),
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
