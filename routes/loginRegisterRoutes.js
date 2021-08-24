const {checkUserExists, getUserPassword, getUserID} = require('../db/rundb/login_queries.js');
const bcrypt = require('bcrypt');

module.exports = function(router) {
  ///Helper function for a promise:

  const checkPassword = function(check, login, userpassword) {
    if (Number(check) === 1) {
      return getUserPassword(login)
      .then((systemPassword) => {
        return (bcrypt.compareSync(userpassword, systemPassword['password']))
      }) ;
    }
  }

  //Login route which will redirect user to customer_page if his attempt is succesfull

  router.post('/login', (req, res) => {
    const {login, password} = req.body;
    checkUserExists(login)
      .then((data) => data['count'])
      .then((data) => {
        checkPassword(data, login, password)
          .then((result) => {
            if (result) {
              getUserID(login)
              .then((id)=> {
                userID = id;
                req.session.userid = userID.id;
                console.log(req.session)
                res
                .status(200)
                .json({ success: true });
              });
            } else {
              res
                .status(401)
                .json({ success: false });
            }
          })
      })
      .catch((error) => res.status(404).send("Error: ", error.message));
  });
}
