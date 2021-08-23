const pool = require('./db_connect');


/**
 * Check if a user exists in the database
 * @param  {Integer} email a user email address
 * @return {Promise<{}>} A promise to the user.
 */
const checkUserExists = function(email) {
  const queryString = 'SELECT count(*) FROM users WHERE email = $1'
  return pool.query(queryString, [email])
    .then(result => result.rows)
    .catch(error => console.log(error.message));
};

exports.checkUserExists = checkUserExists;
