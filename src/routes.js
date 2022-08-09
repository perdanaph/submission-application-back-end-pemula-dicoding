const {
  postHandlerBook,
  getAllhandlerBook,
  getByIdHandlerBook} = require('./handler');


const routes = [
  {
    method: 'POST',
    path: '/books',
    hanlder: postHandlerBook,
  },
  {
    method: 'GET',
    path: '/books',
    henlder: getAllhandlerBook,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    hanlder: getByIdHandlerBook,
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
