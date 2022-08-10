const {
  postHandlerBook,
  getAllhandlerBook,
  getByIdHandlerBook,
  putHandlerBookByid,
  deleteHandlerBookById} = require('./handler');


const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: postHandlerBook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllhandlerBook,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getByIdHandlerBook,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: putHandlerBookByid,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteHandlerBookById,
  },
];

module.exports = routes;
