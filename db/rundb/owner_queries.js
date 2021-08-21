const db = require('db_connect');

const getMenuItems = () => {
  return db.query('SELECT * FROM menu_items')
    .then((response) => response.rows)
    .catch((error) => console.error(error.message));
}

const getAllOrders = () => {
  return db.query('SELECT * FROM orders')
  .then((response) => response.rows)
  .catch((error) => console.error(error.message));
}

const getMenuItem = (id) => {
  return db.query('SELECT * FROM menu_items WHERE id = $1', [id])
  .then((result) => result.rows[0])
  .catch((error) => console.error(error.message));
}

const getOrderDetails = (id) => {
  const queryString =   `SELECT *
                        FROM orders
                        JOIN order_items
                        ON orders.id = order_items.orders_id
                        WHERE orders.id = $1`
  return db.query(queryString, [id])
  .then(result => result.rows[0])
  .catch(error => console.error(error.message))
}

module.export = {
  getMenuItems,
  getAllOrders,
  getMenuItem,
  getOrderDetails
}

