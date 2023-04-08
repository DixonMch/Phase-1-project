/*const form = document.querySelector('form');
const searchInput = document.querySelector('#search-input');
const bookList = document.querySelector('#book-list');

form.addEventListener('submit', e => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (!searchTerm) return;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      bookList.innerHTML = '';
      data.items.forEach(book => {
        const li = document.createElement('li');
        const h2 = document.createElement('h2');
        const p = document.createElement('p');
        const img = document.createElement('img');
        const button = document.createElement('button');

        h2.textContent = book.volumeInfo.title;
        p.textContent = book.volumeInfo.authors?.join(', ');
        img.src = book.volumeInfo.imageLinks?.thumbnail;
        button.textContent = 'Details';

        li.appendChild(h2);
        li.appendChild(p);
        li.appendChild(img);
        li.appendChild(button);
        bookList.appendChild(li);

        button.addEventListener('click', () => {
          showBookDetails(book);
        });
      });
    })
    .catch(error => console.log(error));
});

function showBookDetails(book) {
  const bookCover = document.querySelector('#book-cover');
  const bookTitle = document.querySelector('#book-title');
  const bookAuthor = document.querySelector('#book-author');
  const bookPublisher = document.querySelector('#book-publisher');
  const bookPublishedDate = document.querySelector('#book-published-date');
  const bookDescription = document.querySelector('#book-description');
  const bookReviews = document.querySelector('#book-reviews');

  bookCover.innerHTML = `<img src="${book.volumeInfo.imageLinks?.thumbnail}"/>`;
  bookTitle.textContent = book.volumeInfo.title;
  bookAuthor.textContent = book.volumeInfo.authors?.join(', ');
  bookPublisher.textContent = book.volumeInfo.publisher;
  bookPublishedDate.textContent = book.volumeInfo.publishedDate;
  bookDescription.textContent = book.volumeInfo.description;
  bookReviews.innerHTML = '';
  if (book.volumeInfo.averageRating) {
    const rating = document.createElement('p');
    const numRatings = document.createElement('p');
    rating.textContent = `Average rating: ${book.volumeInfo.averageRating}/5`;
    numRatings.textContent = `Number of ratings: ${book.volumeInfo.ratingsCount}`;
    bookReviews.appendChild(rating);
    bookReviews.appendChild(numRatings);
  } else {
    const noReviews = document.createElement('p');
    noReviews.textContent = 'No ratings or reviews available';
    bookReviews.appendChild(noReviews);
  }
}*/

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
});
