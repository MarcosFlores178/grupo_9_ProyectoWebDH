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
};

module.exports = mainController;
