// import mariadb
var mariadb = require('mariadb');

// create a new connection pool
const pool = mariadb.createPool({
//   host: "127.0.0.1",
  host: "mymaria", // container name
  port: 3306, 
  user: "root", 
  password: "pass",
  database: "demo",
  connectionLimit: 5
});

// expose the ability to create new connections
module.exports={
    getConnection: function(){
      return new Promise(function(resolve,reject){
        pool.getConnection().then(function(connection){
          resolve(connection);
        }).catch(function(error){
          reject(error);
        });
      });
    }
  } 