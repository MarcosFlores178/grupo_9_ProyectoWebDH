const mainController = {
  showIndex: (req, res) => {
    let usuario;
    if (req.session.user) {
      usuario = req.session.user;
      return res.render("main/index", { usuario });
    } else {
      usuario = "no hay usuario logueado";
      return res.render("main/index", { usuario });
    }
  },
};

module.exports = mainController;
