const {postHandlerBook} = require('./handler');


const routes = [
  {
    method: 'POST',
    path: '/books',
    hanlder: postHandlerBook,
  },
  {
    method: 'GET',
    path: '/books',
    henlder: () => {},
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    hanlder: () => {},
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
