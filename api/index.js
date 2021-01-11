const executer = require('../helpers/mysqlExecuter')
const response = require("../helpers/response")

  var createBook = async function(req, res, next){
    try{
      const author = req.body.author;
      const title = req.body.title;
      const isbn = req.body.isbn;
      const releaseDate = req.body.releaseDate;
      var rdate = '';
      if(!author){
        response.returnInvalid(req, res, 'Author can not be empty', []);
      } else if(!title){
        response.returnInvalid(req, res, 'Title can not be empty', []);
      } else if(!isbn){
        response.returnInvalid(req, res, 'ISBN can not be empty', []);
      } else {
        if(!releaseDate){
          rdate = null
        }else {
          rdate = `'${releaseDate}'`
        }
        let checkISBN = `select * from book where isbn = '${isbn}'`;
        let isbnRes =  await executer.executeQuery([checkISBN]);
        if(isbnRes[0].length > 0){
          response.returnInvalid(req, res, 'ISBN already exist', []);
        }else {
          let insertQuery = `INSERT INTO
                  book (author, title, isbn, release_date) 
              VALUES
                  (
                    '${author}', '${title}', '${isbn}', ${rdate}
                  )`;    
          let insertResult =  await executer.executeQuery([insertQuery])
          if(insertResult[0].insertId){
          response.returnTrue(req, res, 'Success', {message : "Book Inserted successfully"});
          }else {
          response.returnFalse(req, res, 'Success', []);
  
          }
        }
      }
    }catch(e){
      response.returnInvalid(req, res, 'Invalid Request', []);
    }
  }


  var getAllBooks = async function(req, res, next){
    try{
      let numRows;
      let numPerPage = parseInt(req.query.npp, 10) || 10;
      let page = parseInt(req.query.page, 10) || 1;
      let getId = req.params.id;
      let numPages;
      page = page - 1;
      let skip = page * numPerPage;
      var limit = skip + ',' + numPerPage;
      var selectCase =``;
      if(!getId){

      }else {
        selectCase = `where id  = ${getId}`
      }
      let countRecords = `SELECT count(*) as numRows FROM book ${selectCase}`;
      let count_result =  await executer.executeQuery([countRecords])
      if(count_result[0][0].numRows > 0){
        numRows = count_result[0][0].numRows;
        numPages = Math.ceil(numRows / numPerPage);
        let getQuery = `SELECT * FROM book  ${selectCase}  LIMIT ${limit}`;
        let queryResult =  await executer.executeQuery([getQuery])
        if(queryResult[0].length > 0){
          var responsePayload = {
            results: queryResult[0]
          };
          if (page < numPages) {
            responsePayload.pagination = {
              total : numRows,
              current: page + 1,
              perPage: numPerPage,
              previous: page > 0 ? page : undefined,
              next: page + 1 < numPages ? page + 2 : undefined
            }
          }
          else responsePayload.pagination = {
            err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
          }
          response.returnTrue(req, res, 'Success', responsePayload);
    
        } else {
        response.returnTrue(req, res, 'No data found', []);
        }
      } else {
        response.returnTrue(req, res, 'No data found', []);
      }
    }
    catch(e){
      response.returnInvalid(req, res, 'Invalid Request', []);
    }
  }


  var updateBook = async function(req, res, next){
    try {
      const author = req.body.author;
      const title = req.body.title;
      const isbn = req.body.isbn;
      const releaseDate = req.body.releaseDate;
      const getId = req.params.id;
  
      var rdate = '';
      if(!getId){
        response.returnInvalid(req, res, 'Book not selected', []);
      } else if(!author){
        response.returnInvalid(req, res, 'Author can not be empty', []);
      } else if(!title){
        response.returnInvalid(req, res, 'Title can not be empty', []);
      } else if(!isbn){
        response.returnInvalid(req, res, 'ISBN can not be empty', []);
      } else {
        if(!releaseDate){
          rdate = null
        }else {
          rdate = `'${releaseDate}'`
        }
        let checkISBN = `select * from book where isbn = '${isbn}'`;
        let isbnRes =  await executer.executeQuery([checkISBN]);
        if(isbnRes[0].length > 0){
          response.returnInvalid(req, res, 'ISBN already exist', []);
        }else {
          let updateQuery = `update book set author ='${author}', title='${title}', isbn='${isbn}', release_date=${rdate} where id = ${getId}`;          
          let updateQueryResult =  await executer.executeQuery([updateQuery])
          if(updateQueryResult[0].affectedRows > 0){
            response.returnTrue(req, res, 'Book Updated',  {message : "Book Updated successfully"} ); 
          } else {
            response.returnInvalid(req, res, 'Book Update Failed',  []  ); 
          }
        }
      }
    } catch(e){
        response.returnInvalid(req, res, 'Invalid Request', []);
    }
    
  }

  var deleteOneBook = async function(req, res,next){
    try{
      const getId = req.params.id;
      if(!getId){
        response.returnInvalid(req, res, 'Book id can not be empty', []);
      }else {
        let getQuery = `DELETE FROM book where id = ${getId}`;
        let result =  await executer.executeQuery([getQuery])
        if(result[0].affectedRows > 0 ){
          response.returnTrue(req, res, 'Success', [{"message" : "Book deleted successfully"}]);
        } else {
          response.returnNotFound(req, res, 'Book not found', []);
        }
      }
    }catch(e){
      response.returnInvalid(req, res, 'Invalid Request', []);
    }
  }



var book = {
  createBook : createBook,
  getAllBooks : getAllBooks,
  updateBook : updateBook,
  deleteOneBook : deleteOneBook
};

module.exports = book;