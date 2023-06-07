import Book from './Book';
import PropTypes from 'prop-types';

const BookShelf = ({ title, books, onUpdateShelf }) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{ title }</h2>
            <div className="bookshelf-books">
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
        </div>
    );
};

BookShelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
};

export default BookShelf;