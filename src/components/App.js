import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';

import "./App.css";
import ListBookShelves from './ListBookShelves';

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      console.log('Books:', res);
      setBooks(res);
    };

    void getBooks();
  }, []);

  const updateShelf = async (book, shelf) => {
    void BooksAPI.update(book, shelf);

    // Update UI without making another request to BE
    const updatedBooks = books.map((b) => {
      if (b.id === book.id) {
        b.shelf = shelf;
      }
      return b;
    });
    setBooks(updatedBooks);
  };

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
          <ListBookShelves books={books} onBookUpdateShelf={ (book, shelf) => updateShelf(book, shelf) } />
      )}
    </div>
  );
}

export default App;
