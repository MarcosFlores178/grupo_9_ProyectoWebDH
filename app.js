const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port= process.env.PORT || 8080;

const rutaUsers = require('./routes/users.js');
const rutaProducts = require('./routes/products.js');
const rutaMain = require('./routes/main.js');




app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', rutaUsers);
app.use('/products', rutaProducts);
app.use('/', rutaMain);

app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto 8080");
});
