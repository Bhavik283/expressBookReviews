const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if(username && password) {
    if(!isValid(username)) {
      users.push({
        "username": username, "password": password
      });
      return res.status(200).send({message: "User registration successful"});
    }else{
      return res.status(400).send({message: "User already exists"});
    }
  }

  return res.status(400).send({message: "Enter something valid"});
});

//Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books));
  //return res.status(300).json({message: "Yet to be implemented"});
});

//Task 10
public_users.get('/', function(req, res) {
  let myPromise = new Promise((resolve, reject) => {
    resolve(books);
  });
  myPromise.then((book) => {
    res.send(JSON.stringify(book));
  }).catch((error) => {
    res.status(404).send(error);
  });
});



//Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn]);
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
//Task 11
public_users.get('/isbn/:isbn', function(req, res) {
  const isbn = req.params.isbn;

  const getBookByISBN = new Promise((resolve, reject) => {
    const book = books[isbn];
    if (book) {
      resolve(book);
    } else {
      reject({ message: "Book not found" });
    }
  });
  getBookByISBN.then((book) => {
    res.send(book);
  }).catch((error) => {
    res.status(404).send(error);
  });

});


// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  const authorBooks = [];

  for (const key in books) {
    if (books.hasOwnProperty(key)) {
      if (books[key].author === author) {
        authorBooks.push(books[key]);
      }
    }
  }

  if (authorBooks.length > 0) {
    res.send(authorBooks);
  } else {
    res.status(404).json({ message: 'No books found for the provided author' });
  }

  //return res.status(300).json({message: "Yet to be implemented"});
});

//Task 12
public_users.get('/author/:author', function(req, res) {
  const author = req.params.author;
  let authorBooks = [];

  console.log(author);
  const getBookByAuthor = new Promise((resolve, reject) => {
  
    for (const key in books) {
      if (books.hasOwnProperty(key)) {
        if (books[key].author === author) {
          authorBooks.push(books[key]);
        }
      }
    }
    if (authorBooks.length > 0) {
      resolve(authorBooks);
    } else {
      reject({ message: "Book not found" });
    }
  });
  getBookByAuthor.then((book) => {
    res.send(book);
  }).catch((error) => {
    res.status(404).send(error);
  });

});



// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const titleBooks = [];

  for (const key in books) {
    if (books.hasOwnProperty(key)) {
      if (books[key].title === title) {
        titleBooks.push(books[key]);
      }
    }
  }

  if (titleBooks.length > 0) {
    res.send(titleBooks);
  } else {
    res.status(404).json({ message: 'No books found for the provided title' });
  }

  //return res.status(300).json({message: "Yet to be implemented"});
});

//Task 13
public_users.get('/title/:title', function(req, res) {
  const title = req.params.title;
  let titleBooks = [];

  console.log(title);
  const getBookByTitle = new Promise((resolve, reject) => {
  
    for (const key in books) {
      if (books.hasOwnProperty(key)) {
        if (books[key].title === title) {
          titleBooks.push(books[key]);
        }
      }
    }
    if (titleBooks.length > 0) {
      resolve(titleBooks);
    } else {
      reject({ message: "Book not found" });
    }
  });
  getBookByTitle.then((book) => {
    res.send(book);
  }).catch((error) => {
    res.status(404).send(error);
  });

});




//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  res.send(books[isbn].reviews);

  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
