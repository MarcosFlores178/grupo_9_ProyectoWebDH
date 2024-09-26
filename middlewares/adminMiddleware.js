function adminMiddleware(req, res, next) {
  if (req.session.user) {
    if (req.session.user.tipo_usuario == "admin") {
      next();
    }
  } else {
    res.send("solo los administradores puede ingresar a esta pagina");
  }
}
module.exports = adminMiddleware;
