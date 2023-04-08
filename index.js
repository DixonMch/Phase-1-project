
const searchInput = document.getElementById("search-input");
const bookList = document.getElementById("book-list");
const bookTitle = document.getElementById("book-title");
const bookAuthor = document.getElementById("book-author");
const bookPublisher = document.getElementById("book-publisher");
const bookPublishedDate = document.getElementById("book-published-date");
const bookDescription = document.getElementById("book-description");
const bookReviews = document.getElementById("book-reviews");
const bookCover = document.getElementById("book-cover");

const API_URL = "https://www.googleapis.com/books/v1/volumes";

// Search for books by keyword
function searchBooks(query) {
  const url = `${API_URL}?q=${query}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      bookList.innerHTML = "";
      data.items.forEach((item) => {
        const book = document.createElement("li");
        const bookLink = document.createElement("a");
        const bookImage = document.createElement("img");

        bookLink.href = "#";
        bookLink.addEventListener("click", () => {
          displayBookDetails(item);
        });

        if (item.volumeInfo.imageLinks) {
          bookImage.src = item.volumeInfo.imageLinks.thumbnail;
        } else {
          bookImage.src = "https://via.placeholder.com/128x192.png?text=No+Cover";
        }

        bookLink.appendChild(bookImage);
        book.appendChild(bookLink);
        bookList.appendChild(book);
      });
    })
    .catch((error) => console.log(error));
}

// Display book details
function displayBookDetails(bookData) {
  bookTitle.textContent = bookData.volumeInfo.title;
  bookAuthor.textContent = `By ${bookData.volumeInfo.authors}`;
  bookPublisher.textContent = `Published by ${bookData.volumeInfo.publisher}`;
  bookPublishedDate.textContent = `Published on ${bookData.volumeInfo.publishedDate}`;
  bookDescription.textContent = bookData.volumeInfo.description || "No description available.";
  bookCover.innerHTML = `<img src="${bookData.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192.png?text=No+Cover'}">`;

  if (bookData.volumeInfo.averageRating) {
    bookReviews.textContent = `Average rating: ${bookData.volumeInfo.averageRating} (${bookData.volumeInfo.ratingsCount} reviews)`;
  } else {
    bookReviews.textContent = "No reviews available.";
  }
}

// Listen for form submit event
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchInput.value;
  searchBooks(query);
  event.target.reset(); // Reset the form input to an empty string
});
/*
// Delay the execution of the fetch command by one second
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    searchBooks("");
  }, 1000);
});*/