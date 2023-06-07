import { useState, useEffect } from "react";
import BookShelf from './BookShelf';
import * as BooksAPI from '../BooksAPI';

import "./App.css";

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
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf
                  title="Currently Reading"
                  books={ books.filter((book) => book.shelf === 'currentlyReading') }
                  onUpdateShelf={ (book, shelf) => updateShelf(book, shelf) }
              />
              <BookShelf
                  title="Want to Read"
                  books={ books.filter((book) => book.shelf === 'wantToRead') }
                  onUpdateShelf={ (book, shelf) => updateShelf(book, shelf) }
              />
              <BookShelf
                  title="Read"
                  books={ books.filter((book) => book.shelf === 'read') }
                  onUpdateShelf={ (book, shelf) => updateShelf(book, shelf) }
              />
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
