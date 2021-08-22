// const bcrypt = require('bcrypt');
const {getMenuItemsForClients, getClientOrders} = require('../db/rundb/client_queries')

// PG database client connection

module.exports = function(router) {

  router.get('/menu', (req, res) => {
    getMenuItemsForClients.
      then((result) => console.log(result));
  })



}
