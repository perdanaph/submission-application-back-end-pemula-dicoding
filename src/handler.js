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

module.exports = {
  postHandlerBook,
};
