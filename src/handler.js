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
  try {
    const {name, reading, finished} = request.query;
    let bookValues = storage;
  
    if (name !== undefined) {
      bookValues = bookValues.filter((result) => result.name.toLowerCase().includes(name.toLowerCase()));
    }
  
    if (reading !== undefined) {
      bookValues = bookValues.filter((result) => result.reading === (reading === '1'));
    }
  
    if (finished !== undefined) {
      bookValues = bookValues.filter((result) => result.finished === (finished === '1'));
    }
  
    const finalBooksResult = bookValues.map((bookResult) => ({
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
  } catch (err) {
    return h.response({
      status: 'fail',
      message: 'Terjadi kesalahan pada server',
    }).code(500);
  }
};

// GET booksById
const getByIdHandlerBook = (request, h) => {
  try {
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
  } catch (err) {
    return h.response({
      status: 'fail',
      message: 'Terjadi kesalahan pada server',
    }).code(500);
  }
};

// PUT booksById
const putHandlerBookByid = (request, h) => {
  try {
    const {payload} = request;
    const {bookId} = request.params;
    const getBook = storage.filter((idBook) => idBook.id === bookId)[0];
  
    if (payload.name === undefined) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      }).code(400);
    };
  
    if (getBook === undefined) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      }).code(404);
    };
  
    if (payload.readPage > payload.pageCount) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      }).code(400);
    };
  
    getBook.updateBooks(payload);
    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }).code(200);
  } catch (err) {
    return h.response({
      status: 'fail',
      message: 'Terjadi kesalahan pada server',
    }).code(500);
  }
};

// Delete bookById
const deleteHandlerBookById = (request, h) => {
  try {
    const {bookId} = request.params;
    const getBookId = storage.findIndex((idBook) => idBook.id === bookId);
  
    if (getBookId !== -1) {
      storage.splice(getBookId, 1);
      return h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      }).code(200);
    };
    return h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404);
  } catch (err) {
    return h.response({
      status: 'fail',
      message: 'Terjadi kesalahan pada server',
    }).code(500);
  }
};


module.exports = {
  postHandlerBook,
  getByIdHandlerBook,
  getAllhandlerBook,
  putHandlerBookByid,
  deleteHandlerBookById,
};
