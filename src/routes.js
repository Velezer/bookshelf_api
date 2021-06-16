const {
  addBookHandler, getAllBooksHandler, getBookById, editBookByIdHandler, deleteBookById,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  }, {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  }, {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookById,
  }, {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookByIdHandler,
  }, {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookById,
  },
];

module.exports = routes;
