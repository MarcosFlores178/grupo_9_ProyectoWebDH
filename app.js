const express = require("express");
const path = require("path");
const app = express();


app.use( express.static(publicPath) );
app.get('/',(req, res) => res.sendFile(path.resolve(__dirname, 'views/index.html')));


app.listen(8080, () => {
  console.log("Servidor corriendo en el puerto 8080");
});

