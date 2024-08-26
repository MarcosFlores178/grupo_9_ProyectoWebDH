function userMiddleware(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.send("Debe loguearse para acceder al carrito de compras");
  }
}
module.exports = userMiddleware;
