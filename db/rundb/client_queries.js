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
};

exports.getMenuItemsForClients = getMenuItemsForClients;

/**
 * Get a list of all items from the database which user can see.
 * @param  {Integer} id An id of user
 * @return {Promise<{}>} A promise to the user.
 */
const getClientOrders = function(id) {
  const queryString = 'SELECT * FROM orders'
  if (id !== undefined) {
    queryString += ` WHERE id = $1`
  }

  return pool.query(queryString, [id])
    .then(result => result.rows[0])
    .catch(error => console.error(error.message));
};

exports.getClientOrders = getClientOrders

/**
 * Get a list of all users from the database.
 * @return {Promise<{}>} A promise to the user.
 */

const getUsers = function() {
  const queryString = `SELECT * FROM users`
  return pool
    .query(queryString)
    .then(result => result.rows)
    .catch(error => console.error(error.message))
}

exports.getUsers = getUsers

const getLoggedInUser = function(id) {
  const queryString = `SELECT * FROM users WHERE id = $1`
  return pool
    .query(queryString, [id])
    .then(result => result.rows)
    .catch(error => console.error(error.message))
}

exports.getLoggedInUser = getLoggedInUser





