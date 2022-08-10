const {
  postHandlerBook,
  getAllhandlerBook,
  getByIdHandlerBook} = require('./handler');


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
    handler: () => {},
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: () => {},
  },
];

module.exports = routes;
