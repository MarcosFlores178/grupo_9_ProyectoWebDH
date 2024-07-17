const express = require('express');
const path = require("path");
const router = express.Router();

router.get("/details-product", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'details-product.ejs'));
});
  
router.get("/shopping-cart", (req, res) =>{
   res.sendFile(path.resolve(__dirname,'shopping-cart.ejs'));
});

module.exports = router;