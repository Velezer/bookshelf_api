const { nanoid } = require('nanoid')
const books = require('./books');


const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        })
        response.code(400)
        return response
    }
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readpage tidak boleh lebih besar dari pageCount'
        })
        response.code(400)
        return response
    }

    const id = nanoid(10)
    const finished = pageCount === readPage
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt

    newBook = {
        name, year, author, summary, publisher, pageCount, readPage, reading,
        id, finished, insertedAt, updatedAt
    }
    books.push(newBook)

    const isSuccess = books.filter((book) => book.id === id).length > 0

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: { bookId: id }
        })
        response.code(201)
        return response
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan'
    })
    response.code(500)
    return response
}

const getAllBooksHandler = (request, h) => {

    const { name, reading, finished } = request.query

    let books = books
    if (name) books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
    if (reading == 1) books = books.filter((book) => book.reading == true)
    if (reading == 0) books = books.filter((book) => book.reading == false)
    if (finished == 1) books = books.filter((book) => book.finished == true)
    if (finished == 0) books = books.filter((book) => book.finished == false)

    theBooks = []
    for (book of books) {
        theBooks.push({
            id: book.id,
            name: book.name,
            publisher: book.publisher
        })
    }
    const response = h.response({
        status: 'success',
        data: { books: theBooks }
    })
    response.code(200)
    return response
}

const getBookById = (request, h) => {
    const { id } = request.params

    const book = books.filter((book) => book.id === id)[0]

    if (book != undefined) {
        return {
            status: 'success',
            data: { book }
        }
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    })
    response.code(404)
    return response

}


const editBookByIdHandler = (request, h) => {
    const { id } = request.params

    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        })
        response.code(400)
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        })
        response.code(400)
        return response
    }
    const updatedAt = new Date().toISOString()

    const index = books.findIndex((book) => book.id === id)

    if (index !== -1) {
        books[index] = {
            ...books[index], name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt
        }
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        })
        response.code(200)
        return response
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan'
    })
    response.code(404)
    return response

}

const deleteBookById = (request, h) => {
    const { id } = request.params
    const index = books.findIndex((book) => book.id === id)

    if (index !== -1) {
        books.splice(index, 1)
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus'
        })

        response.code(200)
    }
    const response = h.respose({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan'
    })
}

module.exports = { addBookHandler, getAllBooksHandler, getBookById, editBookByIdHandler, deleteBookById }