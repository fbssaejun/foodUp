const db = require('./db_connect');

/**
 * Get a list of all items from the database including hidden.
 * @return {Promise<{}>} A promise to the user.
 */

const getMenuItems = () => {
  return db.query('SELECT * FROM menu_items')
    .then((response) => response.rows)
    .catch((error) => console.error(error.message));
}

exports.getMenuItems = getMenuItems;

/**
 * Get a list of all orders from the database which user can see.
 * @return {Promise<{}>} A promise to the user.
 */

const getAllOrders = () => {
  return db.query('SELECT * FROM orders')
  .then((response) => response.rows)
  .catch((error) => console.error(error.message));
}

exports.getAllOrders = getAllOrders;

/**
 * Get a specific item from menu by ID
 * @param  {Integer} id An id of item
 * @return {Promise<{}>} A promise to the user.
 */

const getMenuItem = (id) => {
  return db.query('SELECT * FROM menu_items WHERE id = $1', [id])
  .then((result) => result.rows[0])
  .catch((error) => console.error(error.message));
}

exports.getMenuItem = getMenuItem;

/**
 * Get an order uses order ID.
 * @param  {Integer} id An id of order.
 * @return {Promise<{}>} A promise to the user.
 */
const getOrderDetails = (id) => {
  const queryString =   `SELECT *
                        FROM orders
                        JOIN order_items
                        ON orders.id = order_items.order_id
                        WHERE orders.id = $1;`
  return db.query(queryString, [id])
  .then(result => result.rows)
  .catch(error => console.error(error.message))
}

exports.getOrderDetails = getOrderDetails;


