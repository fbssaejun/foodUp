const pool = require('./db_connect');


/**
 * Get a list of all items from the database which user can see.
 * @return {Promise<{}>} A promise to the user.
 */
const getMenuItemsForClients = function() {
  const queryString = 'SELECT * FROM menu_items WHERE available'
  return pool.query(queryString)
    .then(result => result.rows)
    .catch(error => console.log(error.message));
}

exports.getMenuItemsForClients = getMenuItemsForClients;


const getClientOrders = function(id) {
  const queryString = 'SELECT * FROM orders'
  if (id !== undefined) {
    queryString += ` WHERE id = $1`
  }

  return pool.query(queryString, [id])
    .then(result => result.rows)
    .catch(error => console.error(error.message));
}

module.export = {
  getClientOrders
}
