import { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import ListBookShelves from './ListBookShelves';
import Search from './Search';
import "./App.css";

function App() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const getBooks = async () => {
            const res = await BooksAPI.getAll();
            setBooks(res);
        };

        void getBooks();
    }, []);

    const updateShelf = async (book, shelf) => {
        void BooksAPI.update(book, shelf);

        // Update UI without making another request to BE
        const updatedBooks = books.filter((b) => b.id !== book.id);
        updatedBooks.push({ ...book, shelf });
        setBooks(updatedBooks);
    };

    return (
        <Routes>
            <Route
                exact
                path="/"
                element={
                    <ListBookShelves
                        books={books}
                        onBookUpdateShelf={updateShelf}
                    />
                }
            />
            <Route
                path="/search"
                element={
                    <Search onBookUpdateShelf={updateShelf} />
                }
            />
        </Routes>
    )
        ;
}

export default App;
