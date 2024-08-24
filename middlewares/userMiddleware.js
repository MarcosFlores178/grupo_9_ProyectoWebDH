function userMiddleware(req, res, next) {
  if (req.session.user) {
    const usuario = req.session.user;
    return usuario;
  }
  if (usuario != undefined) {
    next();
  } else {
    res.send("debe logearse para ingresar a esta direcion");
  }
}
