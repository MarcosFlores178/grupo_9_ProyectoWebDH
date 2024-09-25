// const usersDataSource = require("../service/usersDataSource.js");
// async function rememberMiddleware(req, res, next) {
//   if (req.cookies && req.session.user == undefined) {
//     let userList = await usersDataSource.load();
//     let user = userList.find((u) => {
//       return u.email == req.cookies.remember;
//     });
//     req.session.user = user;
//   } else {
//     req.cookies = null;
//   }
//   next();
// }
// module.exports = rememberMiddleware;


const db = require("../database/models"); // Asegúrate de que este sea el path correcto a tus modelos Sequelize

async function rememberMiddleware(req, res, next) {
  // Si existe la cookie y no hay un usuario en la sesión
  if (req.cookies && req.session.user == undefined) {
    try {
      // Buscar al usuario en la base de datos usando el email guardado en la cookie
      let user = await db.Usuario.findOne({
        where: { email: req.cookies.remember }
      });

      // Si el usuario existe, lo guardamos en la sesión
      if (user) {
        req.session.user = user;
      }
    } catch (error) {
      console.error("Error al buscar el usuario en la base de datos:", error);
    }
  } else {
    // Si no hay cookies o el usuario ya está en la sesión, limpiamos la cookie
    req.cookies = null;
  }
  
  next();
}

module.exports = rememberMiddleware;
