// const bcrypt = require('bcrypt');
const {getMenuItemsForClients, getClientOrders, getUsers} = require('../db/rundb/client_queries.js')
const {addOrderItemsForClient} = require('../db/rundb/orderQueries')

module.exports = function(router) {

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

  router.get('/login', (req, res) => {
      res
      .status(200)
      .render("login")
  })

  router.get('/orders', (req, res) => {
    res
    .status(200)
    .render("orders")
})

  router.post('/orders', (req, res) => {
    addOrderItemsForClient()
    .then(data => {
      console.log(res.json(data));
    })
  })

  return router;
}
