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
    .catch(error => console.log(error.message));
};

exports.addOrderItemsForClient = addOrderItemsForClient;
