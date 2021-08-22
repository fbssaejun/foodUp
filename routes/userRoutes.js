// const bcrypt = require('bcrypt');
const {getMenuItemsForClients, getClientOrders} = require('../db/rundb/client_queries.js')

// PG database client connection

module.exports = function(router) {

  router.get('/menu', (req, res) => {
    getMenuItemsForClients()
    .then((items) => res.json(items))
    .catch((error) => res.status(404).send("Error: something went wrong: ", error.message))
  })


  return router;
}
