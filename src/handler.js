/* eslint-disable max-len */
const storage = require('./storage');
const Books = require('./book');


// POST to add book
const postHandlerBook = (request, h) => {
  try {
    const {payload} = request;
    if (payload.name === undefined) {
      const status = 'fail';
      const message = 'Gagal menambah buku. Mohon isi nama buku';
      const response = h.response({
        status: status,
        message: message,
      });
      response.code(400);
      return response;
    };

    if (payload.readPage > payload.pageCount) {
      const status = 'fail';
      const message = 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount';
      const response = h.response({
        status: status,
        message: message,
      });
      response.code(400);
      return response;
    };

    const newBook = new Books(payload);
    storage.push(newBook);
    const status = 'success';
    const message = 'Buku berhasil ditambahkan';
    const response = h.response({
      status: status,
      message: message,
      data: {
        bookId: newBook.id,
      },
    });
    response.code(201);
    return response;
  } catch (err) {
    const status = 'error';
    const message = 'Buku gagal ditambahkan';
    const response = h.response({
      status: status,
      message: message,
    });
    response.code(500);
    return response;
  };
};


const getAllhandlerBook = (request, h) => {
  console.info(123);
};

const getByIdHandlerBook = (request, h) => {
  const {bookIdParam} = request.params;
  const getBookById = storage.filter((details) => details.id === bookIdParam)[0];
  if (getBookById !== undefined) {
    const status = 'success';
    const response = h.response().code(200);
    return {
      status: status,
      response: response,
      data: {
        book: {
          getBookById,
        },
      },
    };
  };

  const status = 'fail';
  const message = 'Buku tidak ditemukan';
  const response = h.response({
    status: status,
    message: message,
  });
  response.code(404);
  return response;
};

module.exports = {
  postHandlerBook,
  getByIdHandlerBook,
  getAllhandlerBook,
};
