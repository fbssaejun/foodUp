const db = require('./db_connect');

/**
 * Get a list of all items from the database including hidden.
 * @return {Promise<{}>} A promise to the user.
 */

const getMenuItems = () => {
  return db.query('SELECT * FROM menu_items ORDER BY id')
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
  return db.query('SELECT * FROM menu_items WHERE id = $1 ORDER BY id', [id])
  .then((result) => result.rows[0])
  .catch((error) => console.error(error.message));
}

exports.getMenuItem = getMenuItem;

/**
 * Get an order uses order ID.
 * @param  {Integer} id An id of order.
 * @return {Promise<{}>} A promise to the user.
 */
const getActiveOrderDetails = () => {
  const queryString =   `SELECT orders.id, ordered_at, instructions, menu_id, quantity, menu_items.name as name
                        FROM orders
                        JOIN order_items
                        ON orders.id = order_items.order_id
                        JOIN menu_items ON
                        menu_items.id = menu_id
                        WHERE
                        completed_at IS NULL AND basket = FALSE
                        ORDER BY orders.id;`
  return db.query(queryString)
  .then(result => result.rows)
  .catch(error => console.error(error.message))
}


exports.getActiveOrderDetails = getActiveOrderDetails;




const updateMenuItem = (id,newName,newPrice,newCalories,newCuisine,newPicture,newAvailability) => {
  const queryString =   `UPDATE menu_items SET name = $2, price = $3, kalories = $4, cuisine = $5, available = $6, image_url = $7 WHERE id = $1 RETURNING *`
  return db.query(queryString, [id,newName,newPrice,newCalories,newCuisine,newAvailability, newPicture])
  .then(result => result.rows)
  .catch(error => console.error(error.message))
}

// id SERIAL PRIMARY KEY NOT NULL,
//   name VARCHAR(255) NOT NULL,
//   price INTEGER NOT NULL,
//   description TEXT,
//   image_url VARCHAR(255),
//   kalories INTEGER,
//   cuisine VARCHAR(255),
//   available BOOLEAN DEFAULT FALSE
// );
exports.updateMenuItem  = updateMenuItem;


