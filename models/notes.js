const { v4: uuidv4 } = require('uuid');

class Note {
  constructor(title, content = '') {
    this.id = uuidv4();
    this.title = title;
    this.content = content;
    this.createdAt = new Date().getTime();
    this.updatedAt = this.createdAt;
  }
}

const notesList = [];

module.exports = { Note, notesList }
