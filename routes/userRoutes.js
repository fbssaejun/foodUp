// const bcrypt = require('bcrypt');
const {getMenuItemsForClients, getClientOrders, getUsers} = require('../db/rundb/client_queries.js');
const loginRegisterRoutes = require('./loginRegisterRoutes.js')
// const bcrypt = require('bcrypt');

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
  ====================================================== LOGIN/REGISTRATION ROUTES =======================================================
  =======================================================================================================================================*/
  // Mutate router object by adding routes for login/registration
  loginRegisterRoutes(router);

  router.get('/orders', (req, res) => {
    res
    .status(200)
    .render("orders")
})

  return router;
}
