const dotenv = require('dotenv');
dotenv.config();
var host   = process.env.SQL_HOST;
var user   = process.env.SQL_USER;
var password   = process.env.SQL_PASS;
var db   = process.env.SHOPPINGPAL_DBNAME;


module.exports = {
    'connection' : {
        connectionLimit : 30, 
        host     : host, 
        user     : user, 
        password : password, 
        database : db, 
        debug    :  false
    },

};
