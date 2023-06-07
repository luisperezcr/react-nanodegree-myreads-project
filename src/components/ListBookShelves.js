import PropTypes from 'prop-types';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';

const ListBookShelves = ({ books, onBookUpdateShelf }) => {
    const bookShelves = [
        { value: 'currentlyReading', title: 'Currently Reading' },
        { value: 'wantToRead', title: 'Want To Read' },
        { value: 'read', title: 'Read' }
    ];

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    { bookShelves.map((shelf) => (
                        <BookShelf
                            key={shelf.value}
                            title={shelf.title}
                            books={ books.filter((book) => book.shelf === shelf.value) }
                            onUpdateShelf={(book, shelf) => onBookUpdateShelf(book, shelf)}
                        />
                    )) }
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    );
};

ListBookShelves.propTypes = {
    books: PropTypes.array.isRequired,
    onBookUpdateShelf: PropTypes.func.isRequired
};

export default ListBookShelves;