const {getMenuItemsForClients, getClientOrders, getUsers} = require('../db/rundb/client_queries.js')
const {getMenuItems,getAllOrders,getMenuItem, getOrderDetails} = require('../db/rundb/owner_queries.js')

module.exports = function(router) {

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

  return router;
}
