'use-strict';

import { getAllBooksHandler, addBookHandler, getByIdBooksHandler, updateBookHandler, deleteBookHandler } from './handlers/booksHandler.js';

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: () => {
      return JSON.stringify({
        name: 'Bookshelf REST API',
        description:
          'API ini dibuat untuk memenuhi submission dari course back-end pemula dicoding',
      });
    },
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getByIdBooksHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBookHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookHandler,
  },
];

export default routes;
