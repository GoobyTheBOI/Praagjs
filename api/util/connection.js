// ! Make connection to database
const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

try {
  conn.connect();
} catch (e) {
  console.log('Oops. Connection to MySQL Failed.');
  console.log(e);
}

module.exports = conn;
