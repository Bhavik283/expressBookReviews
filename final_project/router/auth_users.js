const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{"username": "Bhavik", "password":"0000"}];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
  const match = users.filter((user) => user.username === username);
  return match.length > 0;
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
  const match = users.filter((user) => user.username === username && user.password === password);
  return match.length > 0;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here

  const username = req.body.username;
  const password = req.body.password;

  if(!username || !password) {
    return res.status(400).send({message:"Please enter a username and password"});
  }

  if(authenticatedUser(username, password)){
    let accessToken = jwt.sign({data: password}, 'access', {expiresIn: 10*60});
    req.session.authorization = {
      accessToken, username
    }
    return res.status(200).send({message:"User successfully logged in"});
  } else {
      return res.status(401).send({message: "Invalid Login. Check username and password"});
  }

  //return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  const review = req.body.review;
  const username = req.session.authorization.username;

  if(books[isbn]){
    books[isbn].reviews[username] = review;
    return res.status(200).send({message: 'Review posted successfully'});
  }
  else{
    return res.status(403).send({message: 'user or isbn not found'});
  }

  //return res.status(300).json({message: "Yet to be implemented"});
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;

  if(books[isbn]){
    delete books[isbn].reviews[username];
    return res.status(200).send({message: 'Review deleted successfully'});
  }
  else{
    return res.status(403).send({message: 'user or isbn not found'});
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
