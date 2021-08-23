// const bcrypt = require('bcrypt');
const {getMenuItemsForClients, getClientOrders, getUsers} = require('../db/rundb/client_queries.js')

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

  router.post('/login', (req, res) => {
    console.log('Here i am:', req.body)
    const {login, password} = req.body;



  })


  return router;
}
