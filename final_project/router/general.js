const express = require("express");
let books = require("./booksdb.js");
const axios = require("axios");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const { username, password } = req.body; // Extract the username and password from the request body

  // Check if both username and password are provided
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required for registration" });
  }

  // Check if the username already exists
  if (users[username]) {
    return res.status(400).json({
      message: "Username already exists, please choose a different username",
    });
  }

  // If the username doesn't exist, create a new user
  users[username] = password;

  return res.status(200).json({ message: "User registered successfully" });
});

// Get the book list available in the shop using async-await
public_users.get("/", async function (req, res) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Extracting the books from my local data (booksdb.js)
    const bookList = Object.values(books);

    // Formatting the books
    let formattedBooks = bookList.map((book) => JSON.stringify(book, null, 2));

    return res.status(200).json({ books: formattedBooks });
  } catch (error) {
    console.error("Error fetching books:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get book details based on ISBN using promises
public_users.get("/isbn/:isbn", function (req, res) {
  // Extract the ISBN from the request parameters
  const isbn = req.params.isbn;

  const apiUrl = `http://localhost:5000/isbn/${isbn}`;

  axios
    .get(apiUrl)
    .then((response) => {
      // Check if the book is found
      if (response.data && response.data.book) {
        return res.status(200).json({ book: response.data.book });
      } else {
        return res.status(404).json({ message: "Book not found" });
      }
    })
    .catch((error) => {
      console.error("Error fetching book details:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    });
});
// Get book details based on author
public_users.get("/author/:author", async function (req, res) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const author = req.params.author; // Extract the author from the request parameters
    const bookList = Object.values(books); // Retrieve the list of books

    const filteredBooks = bookList.filter(
      (book) => book.author.toLowerCase() === author.toLowerCase()
    ); // Filter the books based on the author

    if (filteredBooks.length > 0) {
      return res.status(200).json({ books: filteredBooks });
    } else {
      return res
        .status(404)
        .json({ message: "No books found for the provided author" });
    }
  } catch (error) {
    console.error("Error fetching books by author:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all books based on title
public_users.get("/title/:title", async function (req, res) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const title = req.params.title; // Extract the title from the request parameters
    const bookList = Object.values(books); // Retrieve the list of books

    const filteredBooks = bookList.filter((book) =>
      book.title.toLowerCase().includes(title.toLowerCase())
    ); // Filter the books based on the title

    if (filteredBooks.length > 0) {
      return res.status(200).json({ books: filteredBooks });
    } else {
      return res
        .status(404)
        .json({ message: "No books found for the provided title" });
    }
  } catch (error) {
    console.error("Error fetching books by title:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get book review
//It will return an empty review unless i change it from booksdb.js
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn; // Extract the ISBN from the request parameters
  const book = Object.values(books).find((item) => item.isbn === isbn); // Find the book with the corresponding ISBN

  if (book) {
    const reviews = book.reviews; // Extract the reviews for the book
    return res.status(200).json({ reviews: reviews });
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = public_users;
