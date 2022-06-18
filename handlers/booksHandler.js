'use-strict';

import Books from '../entities/Books.js';
import { nanoid } from 'nanoid';
import { sendSuccess, sendFailed } from '../utils/response.js';
import formatBooks from '../utils/formatBooks.js';

const getAllBooksHandler = async (request, h) => {
  const { name, reading, finished } = request.query;

  const allBooks = formatBooks(Books);

  if (typeof name === 'string') {
    return getBooksByName(name, h);
  }

  if (typeof reading === 'string') {
    return getReadBooks(reading, h);
  }

  if (typeof finished === 'string') {
    return getFinishedBooks(finished, h);
  }

  return sendSuccess(h, 200, { books: allBooks }, 'get all Books success');
};

const getBooksByName = async (name, h) => {
  let filteredBooks = Books.filter((book) => {
    return book.name.toLowerCase().includes(name.toLowerCase());
  });

  filteredBooks = formatBooks(filteredBooks);

  return sendSuccess(
      h,
      200,
      { books: filteredBooks },
      `book(s) with the name ${name}`);
};

const getReadBooks = async (isRead, h) => {
  const status = isRead == 1 ? true : false;

  let filteredBooks = Books.filter((book) => book.reading === status);
  filteredBooks = formatBooks(filteredBooks);

  return sendSuccess(h, 200, { books: filteredBooks }, 'finished book(s)');
};

const getFinishedBooks = async (isFinished, h) => {
  const status = isFinished == 1 ? true : false;

  let filteredBooks = Books.filter((book) => book.finished === status);
  filteredBooks = formatBooks(filteredBooks);

  return sendSuccess(h, 200, { books: filteredBooks }, 'read book(s)');
};

const getByIdBooksHandler = async (request, h) => {
  const { bookId } = request.params;
  const selectedBook = Books.filter((book) => book.id === bookId);

  if (selectedBook.length > 0) {
    return sendSuccess(
        h,
        200,
        { book: selectedBook[0] },
        `book with ID '${bookId}' found`,
    );
  }

  return sendFailed(h, 404, 'Buku tidak ditemukan');
};

const addBookHandler = async (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
  } = request.payload;

  const newBook = {
    id: nanoid(),
    name: name,
    year: year,
    author: author,
    summary: summary,
    publisher: publisher,
    pageCount: pageCount,
    readPage: readPage,
    finished: finished ?? pageCount === readPage ? true : false,
    reading: reading ?? true,
    insertedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (!name) {
    return sendFailed( h, 400, 'Gagal menambahkan buku. Mohon isi nama buku');
  }

  if (readPage > pageCount) {
    return sendFailed(
        h,
        400,
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    );
  }

  Books.push(newBook);

  const isCreated = Books.filter((book) => book.id === newBook.id).length > 0;

  if (isCreated) {
    return sendSuccess(
        h,
        201,
        { bookId: newBook.id },
        'Buku berhasil ditambahkan',
    );
  }

  return sendFailed(h, 500, 'Buku gagal ditambahkan', 'error');
};

const updateBookHandler = async (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const bookId = request.params.bookId;
  const updatedAt = new Date().toISOString();

  const bookIndex = Books.findIndex((book) => book.id === bookId);

  if (name === null || typeof name === 'undefined') {
    return sendFailed(h, 400, 'Gagal memperbarui buku. Mohon isi nama buku');
  }

  if (readPage > pageCount) {
    return sendFailed(
        h,
        400,
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    );
  }

  if (bookIndex === -1) {
    return sendFailed(h, 404, 'Gagal memperbarui buku. Id tidak ditemukan');
  }

  Books[bookIndex] = {
    ...Books[bookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt,
  };

  return sendSuccess(h, 200, Books[bookIndex], 'Buku berhasil diperbarui');
};

const deleteBookHandler = async (request, h) => {
  const { bookId } = request.params;
  const bookIndex = Books.findIndex((book) => book.id === bookId);

  if (!bookId) {
    return sendFailed(h, 401, 'Buku gagal dihapus. Id tidak ditemukan');
  }

  if (bookIndex === -1) {
    return sendFailed(h, 404, 'Buku gagal dihapus. Id tidak ditemukan');
  }

  Books.splice(bookIndex, 1);
  return sendSuccess(h, 200, request.params.bookId, 'Buku berhasil dihapus');
};

export {
  getAllBooksHandler,
  addBookHandler,
  getByIdBooksHandler,
  updateBookHandler,
  deleteBookHandler,
};
