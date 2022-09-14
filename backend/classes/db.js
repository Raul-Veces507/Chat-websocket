const dbConfig = require("../config/cona.js");
const mysql = require("mysql");

// var connection = mysql.createPool({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB
// });

var connection = mysql.createPool({
  host:  dbConfig.HOST,
  port     : 3306,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

module.exports = connection;