const usersDataSource = require("../service/usersDataSource.js");
async function rememberMiddleware(req, res, next) {
  if (req.cookies && req.session.user == undefined) {
    let userList = await usersDataSource.load();
    let user = userList.find((u) => {
      return u.email == req.cookies.remember;
    });
    req.session.user = user;
  } else {
    req.cookies = null;
  }
  next();
}
module.exports = rememberMiddleware;
