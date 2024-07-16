const express = require("express");
const path = require("path");
const app = express();


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views/index.html'));
});

app.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views/login.html'));
});

app.get("/register", (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views/register.html'));
});

app.get("/details-product", (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views/Details-producto.html'));
});

app.get("/shop-cart", (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views/shop-cart.html'));
});

app.listen(8080, () => {
  console.log("Servidor corriendo en el puerto 8080");
});

