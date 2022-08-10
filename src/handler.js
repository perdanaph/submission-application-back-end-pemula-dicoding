/* eslint-disable max-len */
const storage = require('./storage');
const Books = require('./book');


// POST to add book
const postHandlerBook = (request, h) => {
  try {
    const {payload} = request;
    if (payload.name === undefined) {
      return h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      }).code(400);
    };

    if (payload.readPage > payload.pageCount) {
      return h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      }).code(400);
    };

    const newBook = new Books(payload);
    storage.push(newBook);
    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: newBook.id,
      },
    }).code(201);
  } catch (err) {
    return h.response({
      status: 'fail',
      message: 'Buku gagal ditambahkan',
    }).code(500);
  };
};

// GET all books
const getAllhandlerBook = (request, h) => {
  const {name, reading, finished} = request.query;
  const bookValues = [...storage.values()];
  let booksByQuery = bookValues;

  if (name !== undefined) {
    booksByQuery = bookValues.filter((result) => result.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading !== undefined) {
    booksByQuery = bookValues.filter((result) => result.reading === (reading === '1'));
  }

  if (finished !== undefined) {
    booksByQuery = bookValues.filter((result) => result.finished === (finished === '1'));
  }

  const finalBooksResult = booksByQuery.map((bookResult) => ({
    id: bookResult.id,
    name: bookResult.name,
    publisher: bookResult.publisher,
  }));
  return h.response({
    status: 'success',
    data: {
      books: finalBooksResult,
    },
  }).code(200);
};

// GET booksById
const getByIdHandlerBook = (request, h) => {
  const {bookId} = request.params;
  const getBook = storage.filter((idBook) => idBook.id === bookId)[0];
  if (getBook !== undefined) {
    return h.response({
      status: 'success',
      data: {
        book: getBook,
      },
    }).code(200);
  }
  return h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  }).code(404);
};

// PUT booksById
const putHandlerBookByid = (request, h) => {
  const {payload} = request;
  const {bookId} = request.params;
  const getBook = storage.filter((idBook) => idBook.id === bookId)[0];

  if (payload.name === undefined) {
    return h.reponse({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  };

  if (getBook === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
  };

  if (payload.readPage > payload.pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
  };

  getBook.updateBooks(payload);
  return h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
};

module.exports = {
  postHandlerBook,
  getByIdHandlerBook,
  getAllhandlerBook,
  putHandlerBookByid,
};
