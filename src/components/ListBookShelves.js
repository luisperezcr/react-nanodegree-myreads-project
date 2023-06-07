import { Fragment } from 'react';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

const ListBookShelves = ({ books, onBookUpdateShelf }) => {
    const bookShelves = [
        { value: 'currentlyReading', title: 'Currently Reading' },
        { value: 'wantToRead', title: 'Want To Read' },
        { value: 'read', title: 'Read' }
    ];

    return (
        <Fragment>
            { bookShelves.map((shelf) => (
                <BookShelf
                    title={shelf.title}
                    books={ books.filter((book) => book.shelf === shelf.value) }
                    onUpdateShelf={(book, shelf) => onBookUpdateShelf(book, shelf)}
                />
            )) }
        </Fragment>
    );
};

ListBookShelves.propTypes = {
    books: PropTypes.object.isRequired,
    onBookUpdateShelf: PropTypes.func.isRequired
};

export default ListBookShelves;