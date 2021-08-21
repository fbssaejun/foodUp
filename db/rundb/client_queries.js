const db = require('db-connect.js');

// Get all items which are available for menu
const getMenuItemsForClients = () => {
  const queryString = 'SELECT * FROM menu_items WHERE available'
  return db.query(queryString)
    .then(result => result.rows)
    .catch(error => console.log(error.message));
}

const getClientOrders = (id) => {
  const queryString = 'SELECT * FROM orders'
  if (id !== undefined) {
    queryString += ` WHERE id = $1`
  }

  return db.query(queryString, [id])
    .then(result => result.rows)
    .catch(error => console.error(error.message));
}

module.export = {
  getMenuItemsForClients,
  getClientOrders
}
