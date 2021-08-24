const pool = require('./db_connect');


/**
 * Get a list of current order items from the database which user can see.
 * @return {Promise<{}>} A promise to the user.
 */

 const addOrderItemsForClient = function(userId) {
  const queryString = 'SELECT * FROM orders JOIN users ON user_id = users.id WHERE user_id = $1 AND completed_at IS NULL;'
  return pool.query(queryString, [userId])
    .then(result => {
        console.log(result.rows)
        const newQuery = `INSERT INTO order_items(quantity, order_id, menu_id) VALUES(1, ${result.rows.id}, 5)`
        return  pool.query(newQuery)
        .then(result => result.rows)

      ;
    })
    .catch(error => console.log(error.message));
}

addOrderItemsForClient(3)

exports.addOrderItemsForClient = addOrderItemsForClient;
