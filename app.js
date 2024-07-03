const express = require("express");
const path = require("path");
const app = express();

const publicPath = path.resolve(__dirname, "./public");

app.use(express.static(publicPath));

app.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./views/login.html"));
});
app.get("/register",(req, res)=>{
    res.sendFile(path.resolve("./views/register.html"));
})
app.listen(8080, () => {
  console.log("Servidor corriendo en el puerto 8080");
});

