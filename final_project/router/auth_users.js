const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = {
  user1: "password1",
  user2: "password2",
};

const isValid = (username) => {
  return users.hasOwnProperty(username);
};

const authenticatedUser = (username, password) => {
  return isValid(username) && users[username] === password;
};

// Only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!isValid(username)) {
    return res.status(401).json({ message: "Invalid username" });
  }

  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // Create a JWT token for the user's session
  const accessToken = jwt.sign({ username: username }, "access");

  return res.status(200).json({ accessToken: accessToken });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const { accessToken } = req.session.authorization;
  const { review } = req.query;
  const { username } = jwt.decode(accessToken);

  if (!review) {
    return res.status(400).json({ message: "Review is required" });
  }

  const isbn = req.params.isbn;

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  // Check if the user has already posted a review for the given ISBN
  if (!books[isbn].reviews[username]) {
    // If not, create a new review
    books[isbn].reviews[username] = review;
  } else {
    // If yes, modify the existing review
    books[isbn].reviews[username] = review;
  }

  return res
    .status(200)
    .json({ message: "Review added or modified successfully" });
});
// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const { accessToken } = req.session.authorization;
  const { username } = jwt.decode(accessToken);

  const isbn = req.params.isbn;

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  // Check if the user has posted a review for the given ISBN
  if (!books[isbn].reviews[username]) {
    return res
      .status(404)
      .json({ message: "Review not found for the given user and ISBN" });
  }

  // Delete the user's review for the given ISBN
  delete books[isbn].reviews[username];

  return res.status(200).json({ message: "Review deleted successfully" });
});
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
