const pool = require('./db_connect');


/**
 * Check if a user exists in the database
 * @param  {Integer} email a user email address
 * @return {Promise<{}>} A promise to the user.
 */
const checkUserExists = function(login) {
  const email = String(login);
  const queryString = `SELECT count(*) FROM users WHERE email LIKE $1`;
  return pool.query(queryString, [email])
    .then(result => result.rows[0])
    .catch(error => console.log(error.message));
};

exports.checkUserExists = checkUserExists;

/**
 * Returns password for a user in database
 * @param  {Integer} email a user email address
 * @return {Promise<{}>} A promise to the user with password for specified email
 */
const getUserPassword = function(login) {
  const email = String(login);
  const queryString = `SELECT password FROM users WHERE email LIKE $1`;
  return pool.query(queryString, [email])
    .then(result => result.rows[0])
    .catch(error => console.log(error.message));
}

exports.getUserPassword = getUserPassword;

/**
 * Returns user ID
 * @param  {Integer} email a user email address
 * @return {Promise<{}>} A promise to the user with password for specified email
 */
 const getUserID = function(login) {
  const email = String(login);
  const queryString = `SELECT id FROM users WHERE email LIKE $1`;
  return pool.query(queryString, [email])
    .then(result => result.rows[0])
    .catch(error => console.log(error.message));
}

exports.getUserID  = getUserID ;
