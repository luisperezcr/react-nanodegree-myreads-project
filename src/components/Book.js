import PropTypes from 'prop-types';
import * as BooksAPI from '../BooksAPI';
import { useState, memo, useEffect } from 'react';

const Book = ({ book, onShelfChange }) => {
    const [bookData, setBookData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const debounce = setTimeout(() => {
            const getBook = async() => {
                const b = await BooksAPI.get(book.id);
                setBookData(b);
                setIsLoading(false);
            };

            void getBook();
        }, 100);

        return () => {
            clearTimeout(debounce);
        };
    }, [book]);

    return (
        <li>
            {
                !isLoading && (
                    <div className="book">
                        <div className="book-top">
                            <div
                                className="book-cover"
                                style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage:
                                        `url(${bookData.imageLinks.thumbnail})`,
                                }}
                            ></div>
                            <div className="book-shelf-changer">
                                <select defaultValue={bookData.shelf} onChange={(e) => onShelfChange(bookData, e.target.value)}>
                                    <option value="moveTo" disabled>
                                        Move to...
                                    </option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                        </div>
                        <div className="book-title">{bookData.title}</div>
                        <div className="book-authors">{(bookData.authors && bookData.authors.length) && bookData.authors.join(', ')}</div>
                    </div>
                )
            }
        </li>
    );
};

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired
};

export default memo(Book);