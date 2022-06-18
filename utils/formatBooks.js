'use-strict';

const formatBooks = (books) => {
  const formatedBooks = books.map((book) => {
    const bookInfo = {};

    bookInfo['id'] = book.id;
    bookInfo['name'] = book.name;
    bookInfo['publisher'] = book.publisher;

    return bookInfo;
  });

  return formatedBooks;
};

export default formatBooks;
