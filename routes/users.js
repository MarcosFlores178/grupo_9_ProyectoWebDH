const express = require('express');
const usersController = require('../controllers/usersController');
// const userController = require('../controllers/userController');
const router = express.Router();

router.get('/login', usersController.showLogin);
  
router.get('/register', usersController.showRegister);

module.exports = router;