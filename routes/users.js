const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();
const {body, check}=require("express-validator");
const fotoUserUpload = require("../service/fotoUserUpload");
const logregMiddleware = require("../middlewares/logregMiddelware.js");


router.get("/login", logregMiddleware, usersController.showLogin);

router.post("/login", usersController.login);

router.get("/logout", usersController.logout);
router.get("/register", logregMiddleware, usersController.showRegister);

const validator = [
  body('nombre').notEmpty().trim().withMessage('Ingrese su nombre'),
  body('apellido').notEmpty().trim().withMessage('Ingrese su apellido'),
  body('dni').isInt().trim().withMessage('Ingrese su dni'),
  body('telefono').isInt().trim().withMessage('Ingrese su teléfono'),
  body('domicilio').notEmpty().trim().withMessage('Ingrese su domicilio'),
  body('country').notEmpty().trim().withMessage('Ingrese su pais'),
  body('nombreUsuario').notEmpty().trim().withMessage('Ingrese su nombre de usuario'),
  body('email').isEmail().trim().withMessage('Ingrese su email'),
  body('emailVerify').isEmail().trim().withMessage('Confirme su email')
      .custom((value, {req}) => value === req.body.email).withMessage("Los emails no coinciden"),
  body('password')
      .notEmpty().withMessage('Ingrese una contraseña')
      .trim()
      .isLength({ min: 8 }).withMessage('La contraseña debe contener al menos 8 caracteres.'),
  body('passwordVerify').notEmpty().withMessage('Confirme su contraseña')
      .notEmpty().withMessage('Ingrese una contraseña')
      .trim()
      .isLength({ min: 8 }).withMessage('La contraseña debe contener al menos 8 caracteres.')
      .custom((value, {req}) => value === req.body.password).withMessage("Las contraseñas no coinciden"),
  check('admincomp')
  .exists().withMessage('Seleccione un rol')
  .bail()
  // .custom((value, { req }) => {
  //     if (!req.body.role || !Array.isArray(req.body.role) || req.body.role.length !== 1) {
  //         throw new Error('Seleccione un rol válido');
  //     }
  //     return true;
  // })
    ] 
router.get("/register", usersController.showRegister);
router.post("/register", fotoUserUpload.single("foto"), validator, usersController.register);

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
