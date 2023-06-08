import { Link, useNavigate } from 'react-router-dom';
import Book from './Book';
import { useState, useEffect } from 'react';
import * as BooksAPI from '../BooksAPI';
import PropTypes from 'prop-types';

const Search = ({ onBookUpdateShelf }) => {
    const navigate = useNavigate();

    const [query, setQuery] = useState('')
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (query) {
                const searchBooks = async () => {
                    const books = await BooksAPI.search(query, 20);
                    setBooks((books && books.length) ? books : []);
                };

                void searchBooks();
            } else {
                setBooks([]);
            }
        }, 300);

        return () => {
            clearTimeout(debounce);
        };
    }, [query]);

    const onUpdateShelf = (book, shelf) => {
        onBookUpdateShelf(book, shelf);
    };

    const goToList = () => {
        setQuery('');
        setBooks([]);
        navigate('/');
    };

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>
            {
                books.length === 0 && (
                    <div className="search-books-results no-results">
                        <span>No books found.</span>
                        <button onClick={goToList}>Go back</button>
                    </div>
                )
            }
            {
                books.length > 0 && (
                    <div className="search-books-results">
                        <ol className="books-grid">
                            { books.map((book) => (
                                <Book
                                    key={book.id}
                                    book={book}
                                    onShelfChange={(book, shelf) => onUpdateShelf(book, shelf)}
                                />
                            )) }
                        </ol>
                    </div>
                )
            }
        </div>
    );
};

Search.propTypes = {
    onBookUpdateShelf: PropTypes.func.isRequired
};

export default Search;