const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn])
 });
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const authorToFind = req.params.author;
  
  // Obtain all the keys for the 'books' object
  const bookKeys = Object.keys(books);

  // Iterate through the 'books' array & check if the author matches the one provided in the request parameters
  for (const key of bookKeys) {
    const book = books[key];
    if (book.author === authorToFind) {
      return res.send(book);
    }
  }

  // If no matching author is found
  res.status(404).json({ message: 'Author not found' });
});
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const titleToFind = req.params.title;
  
  // Obtain all the keys for the 'books' object
  const bookKeys = Object.keys(books);

  // Iterate through the 'books' array & check if the author matches the one provided in the request parameters
  for (const key of bookKeys) {
    const book = books[key];
    if (book.title === titleToFind) {
      return res.send(book);
    }
  }

  // If no matching author is found
  res.status(404).json({ message: 'title not found' });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  
  res.send(books[isbn].reviews)
});

module.exports.general = public_users;
