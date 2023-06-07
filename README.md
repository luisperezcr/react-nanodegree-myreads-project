# My Reads Project

This a React Project as part of the React Nanodegree by Udacity.com

## React Features used

This projects make use of:

- Hooks (`useState` and `useEffect`)
- Routing
- Functional Components

## Project Features

This project allows you to:

- Move books between shelves by using the dropdown
- Search for books to add them to your shelves

## Project Setup

To take a look at the project follow these steps:

1. install all project dependencies with `npm install`
2. start the development server with `npm start`

## Backend Server

This project relies on a Node Backend. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

- [`getAll`](#getall)
- [`get`](#get)
- [`update`](#update)
- [`search`](#search)

### `getAll`

Method Signature:

```js
getAll();
```

- Returns a Promise which resolves to a JSON object containing a collection of book objects.
- This collection represents the books currently in the bookshelves in your app.

### `get`

Method Signature:

```js
get(bookId);
```

- Gets a book by ID. Returns a Promise which resolves to an object containing the data of the book.

### `update`

Method Signature:

```js
update(book, shelf);
```

- book: `<Object>` containing at minimum an `id` attribute
- shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
- Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query);
```

- query: `<String>`
- Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
- These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.
