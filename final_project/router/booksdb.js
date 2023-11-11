// I included an isbn field so i can extract the param from the request and compare it with available books for search functionality
let books = {
  1: {
    isbn: "9780385474542",
    author: "Chinua Achebe",
    title: "Things Fall Apart",
    reviews: {},
  },
  2: {
    isbn: "9781503260785",
    author: "Hans Christian Andersen",
    title: "Fairy tales",
    reviews: {},
  },
  3: {
    isbn: "9780142437222",
    author: "Dante Alighieri",
    title: "The Divine Comedy",
    reviews: {},
  },
  4: {
    isbn: "9780140441000",
    author: "Unknown",
    title: "The Epic Of Gilgamesh",
    reviews: {},
  },
  5: {
    isbn: "9780140449075",
    author: "Unknown",
    title: "The Book Of Job",
    reviews: {},
  },
  6: {
    isbn: "9780140442892",
    author: "Unknown",
    title: "One Thousand and One Nights",
    reviews: {},
  },
  7: {
    isbn: "9780140447699",
    author: "Unknown",
    title: "Njál's Saga",
    reviews: {},
  },
  8: {
    isbn: "9780141439563",
    author: "Jane Austen",
    title: "Pride and Prejudice",
    reviews: {},
  },
  9: {
    isbn: "9780140446265",
    author: "Honoré de Balzac",
    title: "Le Père Goriot",
    reviews: {},
  },
  10: {
    isbn: "9780802150370",
    author: "Samuel Beckett",
    title: "Molloy, Malone Dies, The Unnamable, the trilogy",
    reviews: {},
  },
};

module.exports = books;
