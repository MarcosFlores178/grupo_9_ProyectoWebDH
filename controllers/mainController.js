const mainController = {
  showIndex: (req, res) => {
    let usuario;
    if (req.session.user) {
      usuario = req.session.user;
      return res.render("main/index", { usuario });
    } else {
      return res.render("main/index");
    }
  },
};

module.exports = mainController;
