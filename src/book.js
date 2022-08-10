/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const {nanoid} = require('nanoid');

// Menambah class books yang berisi kriteria buku untuk template saat menambah buku baru
class Books {
  constructor(insert) {
    this.id = nanoid(16);
    this.name = insert.name;
    this.year = insert.year;
    this.author = insert.author;
    this.summary = insert.summary;
    this.publisher = insert.publisher;
    this.pageCount = insert.pageCount;
    this.readPage = insert.readPage;
    this.finished = insert.readPage === insert.pageCount;
    this.reading = insert.reading;

    const timeCreated = new Date().toISOString();
    this.insertedAt = timeCreated;
    this.updatedAt = timeCreated;
  };

  updateBooks(dataUpdate) {
    this.name = dataUpdate.name;
    this.year = dataUpdate.year;
    this.author = dataUpdate.author;
    this.summary = dataUpdate.summary;
    this.publisher = dataUpdate.publisher;
    this.pageCount = dataUpdate.pageCount;
    this.readPage = dataUpdate.readPage;
    this.reading = dataUpdate.reading;
    this.updatedAt = new Date().toISOString();
  };
};


module.exports = Books;
