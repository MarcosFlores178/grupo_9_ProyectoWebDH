const express = require("express");
const usersController = require("../controllers/usersController.js");
const fotoUserUpload = require("../service/fotoUserUpload");
const router = express.Router();

router.get("/login", usersController.showLogin);

router.post("/login", usersController.login);

router.get("/logout", usersController.logout);
router.get("/register", usersController.showRegister);

router.post(
  "/register",
  fotoUserUpload.single("foto"),
  usersController.register
);

router.get("/perfil", usersController.perfil);

module.exports = router;

// validacion de rutas
// app.use((req, res, next) => {
//   if (req.session.user) {
//       next();
//   } else {
//       res.redirect('/login');
//   }
// });
