// const bcrypt = require('bcrypt');
const {getMenuItemsForClients, getClientOrders, getUsers} = require('../db/rundb/client_queries.js');
const {checkUserExists, getUserPassword} = require('../db/rundb/login_queries.js');
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');

module.exports = function(router) {

  /* ====================================================================================================================================
  ====================================================== GET ROUTES  ====================================================================
  =======================================================================================================================================*/


  router.get('/customer_menu', (req, res) => {
    getMenuItemsForClients()
    .then((items) => {
      const templateVars = {items}
      res
      .status(200)
      .render("customer_menu", templateVars)})
    .catch((error) => {
      res
      .status(500)
      .send("Error: something went wrong: ", error.message)})
  });

  router.get("/users", (req, res) => {
    getUsers()
      .then(data => {
        res
        .json(data);
      })
      .catch(error => {
        res
          .status(500)
          .json(error.message);
      });
  });



  /* =====================================================================================================================================
  ====================================================== POST ROUTES  ====================================================================
  =======================================================================================================================================*/

  ///Helper function for a promise:

  const checkPassword = function(check, login, userpassword) {
    console.log("Here is check value:", check);
    if (Number(check) === 1) {
      console.log("I AM HERE")
      getUserPassword(login)
      .then((systemPassword) => {
        console.log("Userpassowrd:", userpassword);
        console.log("System Password:", systemPassword);
        console.log(bcrypt.compareSync(userpassword, systemPassword['password']))
      }) ;
    }
    // else {
    //   res
    //     .status(404)
    //     .send("User not found")
    // }
  }


  router.post('/login', (req, res) => {
    const {login, password} = req.body;
    checkUserExists(login)
      .then((data) => data['count'])
      .then((data) => {
        checkPassword(data, login, password)
      })
      // .catch((error) => res.status(404).send("Error: ", error.message));
    })


  return router;
}
