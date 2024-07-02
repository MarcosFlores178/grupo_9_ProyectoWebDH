const express = require ('express');
const path = require ('path');
const app = express ();

app.use (express.static("./public"));

const port = 8080;

app.listen(port, () => console.log("Servidor corriendo en el puerto 8080"));

app.get("/register",(req, res)=>{
    res.sendFile(path.resolve("./views/register.html"));
})