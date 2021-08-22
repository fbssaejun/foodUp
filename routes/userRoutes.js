// const bcrypt = require('bcrypt');
const {getMenuItemsForClients, getClientOrders, getUsers} = require('../db/rundb/client_queries.js')

module.exports = function(router) {

  router.get('/', (req, res) => {
      res
      .status(200)
      .render("index");
  });

  router.get('/menu', (req, res) => {
    getMenuItemsForClients()
    .then((items) => {
      res
      .json(items)})
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

  router.get("/customer_menu", (req, res) => {
    res
    .status(200)
    .render("customer_menu");
  });

  return router;
}
