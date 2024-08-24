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
