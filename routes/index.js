const express = require('express');
const router = express.Router();
const crud = require ("../api/index")
const executer = require('../helpers/mysqlExecuter')

var createTable = function(){
    let createTodos = `CREATE TABLE if not exists book (
        id int(11) NOT NULL AUTO_INCREMENT,
        author varchar(255) NOT NULL,
        title varchar(255) NOT NULL,
        isbn varchar(255) NOT NULL,
        release_date date DEFAULT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY isbn (isbn)
    )`;
    executer.executeQuery([createTodos]);
}

createTable()




const BASE_URL   = process.env.BASE_URL;
console.log(BASE_URL)
router.post(BASE_URL + 'createBook',crud.createBook)
router.get(BASE_URL + 'getBook',crud.getAllBooks)
router.put(BASE_URL + 'updateBook',crud.updateBook)
router.delete(BASE_URL + 'deleteOneBook',crud.deleteOneBook)

module.exports = router;
