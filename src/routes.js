const {postHandlerBook} = require('./handler');


const routes = [{
  method: 'POST',
  path: '/books',
  handler: postHandlerBook,
}];

module.exports = routes;
