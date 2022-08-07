/* eslint-disable require-jsdoc */
const {nanoid} = require('nanoid');

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
    this.reading = insert.reading;

    const timeCreated = new Date().toISOString();
    this.createdAt = timeCreated;
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

  getIdByNameAndPublisher() {
    return {
      id: this.id,
      name: this.name,
      publisher: this.publisher,
    };
  };
};

module.exports = Books;
