const express = require('express');
const path = require("path");
const router = express.Router();

router.get('/details-product', (req, res) => {
    res.render('products/details-products');
});

router.get('/shoping-card', (req, res) => {
    res.render('products/register');
});

module.exports = router;