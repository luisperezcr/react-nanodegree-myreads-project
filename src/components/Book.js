import { useState } from 'react';
import PropTypes from 'prop-types';

const options = [
    { value: 'currentlyReading', label: 'Currently Reading' },
    { value: 'wantToRead', label: 'Want To Read' },
    { value: 'read', label: 'Read' }
];

const Book = ({ book, onShelfChange }) => {
    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage:
                                `url(${book.imageLinks.thumbnail})`,
                        }}
                    ></div>
                    <div className="book-shelf-changer">
                        <select defaultValue={book.shelf} onChange={(e) => onShelfChange(book, e.target.value)}>
                            <option value="none" disabled>
                                Move to...
                            </option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors.join(', ')}</div>
            </div>
        </li>
    );
};

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired
};

export default Book;