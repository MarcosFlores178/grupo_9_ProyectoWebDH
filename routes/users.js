const express = require('express');
const {body} = require("express-validator");
const usersController = require('../controllers/usersController');
// const userController = require('../controllers/userController');

const router = express.Router();

router.get('/login', usersController.showLogin);

const validator = [
    body('nombre').notEmpty.withMessage('Ingrese un nombre'),
    body('apellido').notEmpty.withMessage('Ingrese un apellido'),
    body('dni').notEmpty.withMessage('Ingrese un dni'),
    body('telefono').notEmpty.withMessage('Ingrese un teléfono'),
    body('domicilio').notEmpty.withMessage('Ingrese un domicilio'),
    body('country').notEmpty.withMessage('Ingrese un pais'),
    body('nombreUsuario').notEmpty.withMessage('Ingrese un nombre de usuario'),
    body('email')
        .notEmpty().withMessage('Ingrese un email')
        .isEmail().withMessage('Ingrese un email válido'),
    body('emailVerify')
        .notEmpty.withMessage('Ingrese un email válido')
        .isEmail().withMessage('Ingrese un email válido'),
    body('password')
        .notEmpty.withMessage('Ingrese una contraseña')
        .isLength({ min: 8 }).withMessage('La contraseña debe contener al menos 8 caraceters.'),
    body('passwordVerify').notEmpty.withMessage('Confirme su contraseña'),
] 
router.get('/register', usersController.showRegister);
router.post('/register', validator, usersController.storeUser);

module.exports = router;