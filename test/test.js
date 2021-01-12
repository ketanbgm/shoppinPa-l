const request = require('supertest');
const app = require("../bin/www");



describe('Book', function() {
  var getId = 0;
  var randomIsbn = Math.floor(Math.random() * 1000000000);;
    let empty_author = {
        "author" : "",
        "title" : "Five and half sense",
        "isbn" : randomIsbn,
        "releaseDate" : "2020-02-02"
    };
    let empty_title = {
        "author" : "Chetan Baghat",
        "title" : "",
        "isbn" : randomIsbn,
        "releaseDate" : "2020-02-02"
     };
     let empty_isbn = {
      "author" : "Chetan Baghat",
      "title" : "Five and half sense",
      "isbn" : "",
      "releaseDate" : "2020-02-02"
      };
      let duplicate_isbn = {
        "author" : "Chetan Baghat",
        "title" : "Five and half sense",
        "isbn" : randomIsbn,
        "releaseDate" : "2020-02-02"
    };
      let add_book = {
        "author" : "Chetan Baghat",
        "title" : "Five and half sense",
        "isbn" : randomIsbn,
        "releaseDate" : "2020-02-02"
    };
    let update_book = {
      "author" : "Chetan Baghat updated",
      "title" : "Five and half sense",
      "isbn" : randomIsbn,
      "releaseDate" : "2020-02-02"
    };
    let book = {
      "getId" : 0
    }


    it('should return a 403 status code author is missing', function(done) {
        request(app)
          .post('/rest/book')
          .send(empty_author)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(403,done)
      });

      it('should return a 403 status code for invalid title', function(done) {
        request(app)
          .post('/rest/book')
          .send(empty_title)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(403,done)
      });

      it('should return a 403 status code isbn is missing', function(done) {
        request(app)
          .post('/rest/book')
          .send(empty_isbn)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(403,done)
      });

      it('should return a 200 status code for insert user', function(done) {
        request(app)
          .post('/rest/book')
          .send(add_book)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200)
          .end(function(err,res){
            getId = res.body.data.insertId;
            book.getId = getId;
            done();
          });
      });

      it('should return a 403 status code duplicate isbn', function(done) {
        request(app)
          .post('/rest/book')
          .send(duplicate_isbn)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(403,done)
      });

      it('should return a 200 status code for one book', function(done) {
        request(app)
          .get('/rest/book/1')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200,done)
      });

      it('should return a 200 status code for ALL BOOK', function(done) {
        request(app)
          .get('/rest/book')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200,done)
      });
      
      it('should return a 200 status code update book', function(done) {
        request(app)
          .put('/rest/book/'+book.getId)
          .send(update_book)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200)
          .end(function(err,res){
            done();
          });
      });

      it('should return a 200 status code delete book', function(done) {
        request(app)
          .delete('/rest/book/'+book.getId)
          .send()
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200,done)
      });
   
});
