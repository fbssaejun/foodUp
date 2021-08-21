// amodule to connect to the database using variables in process.env
require('dotenv').config()
const {Pool} = require('pg');

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  passowrd: process.env.DB_PASS,
  port:5432
}

const dbclient = new Pool(config);

pool.connect(() => {
  console.log('connected to database')
});

module.export = dbclient;
