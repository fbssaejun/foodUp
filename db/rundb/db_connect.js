const pg = require('pg');
const {Pool} = pg.Pool;

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  passowrd: process.env.DB_PASS,
  port:5432
}
