const pool = require('./db_connect');


/**
 * Get a list of current order items from the database which user can see.
 * @return {Promise<{}>} A promise to the user.
 */

 const addOrderItemsForClient = function(user_id) {
  const queryString = 'SELECT * FROM orders WHERE user_id = $1 AND completed_at IS NOT NULL;'
  return pool.query(queryString)
    .then(result => {
      if(!result.rows){
        const newQuery = `INSERT INTO order_items(quantity, order_id, menu_id) VALUES($2, $3, $4)`
        return  pool.query(newQuery)
        .then(result => result.rows)
      }
      result.rows;
    })
 }
 exports.addOrderItemsForClient = addOrderItemsForClient;


 const getOrderItemsForClient = function(userId) {
  const queryString = 'SELECT * FROM orders JOIN users ON user_id = users.id WHERE user_id = $1 AND basket = true;'
  return pool.query(queryString, [userId])
    .then(result => result.rows)
    .catch(error => console.log(error.message));
}

exports.getOrderItemsForClient = getOrderItemsForClient;

const addMenuItemsToOrder = function(order_id, menu_id) {
  const queryString = `INSERT INTO order_items(quantity, order_id, menu_id) VALUES(1, $1, $2) RETURNING *;`
        return  pool.query(queryString, [order_id, menu_id])
        .then(result => console.log(result.rows))
        .catch(error => console.log(error.message));
}

exports.addMenuItemsToOrder = addMenuItemsToOrder;


const addNewOrder = function( ordered_at, instructions, total_price, user_id) {
  const queryString = `INSERT INTO orders ( ordered_at, instructions, total_price, user_id) VALUES($1, $2, $3, $4) RETURNING *;`
        return  pool.query(queryString, [ordered_at, instructions, total_price, user_id])
        .then(result => console.log(result.rows))
        .catch(error => console.log(error.message));
}

exports.addNewOrder = addNewOrder;


const checkIfItemInOrder = function(order_id, menu_id) {
  const queryString = `SELECT count(*) FROM order_items WHERE menu_id = $2 AND order_id = $1`
        return  pool.query(queryString, [order_id, menu_id])
        .then(result => result.rows[0])
        .catch(error => console.log(error.message));
}

exports.checkIfItemInOrder = checkIfItemInOrder;



const incrementItemInOrder = function(order_id, menu_id) {
  const queryString = `UPDATE order_items SET quantity = quantity + 1 WHERE menu_id = $2 AND order_id = $1`
        return  pool.query(queryString, [order_id, menu_id])
        .then(result => (result))
        .catch(error => console.log(error.message));
}

exports.incrementItemInOrder = incrementItemInOrder;
