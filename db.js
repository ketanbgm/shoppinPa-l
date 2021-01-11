var mysql     =    require('mysql');
var connProperties = require('./helpers/dbConfig');
 
var pool      =    mysql.createPool(connProperties.connection);
// var vPool      =    mysql.createPool(connProperties.connection_voltas);


var getConnection = function (callback) {
    pool.getConnection(function (error, connection) {
        if(error){
            return callback(error);
        }
        callback(error, connection);
    });
};

// var getConnectionVoltas = function (callback) {
//     vPool.getConnection(function (error, connection) {
//         if(error){
//             console.log("connection-----------",error)
//             return callback(error);
//         }
//         callback(error, connection);
//     });
// };

module.exports = {
    getConnection : getConnection, 
    // getConnectionVoltas : getConnectionVoltas
};
