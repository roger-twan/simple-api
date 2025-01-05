const { Note, notesList } = require('../models/notes')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class NotesService {
  static async _query() {
    const weathers = await prisma.weather.findMany()
    console.log(weathers)
  }

  // Get all notes
  static getAllNotes() {
    this._query().then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })

    return notesList
  }

  // Get a note by ID
  static getNoteById(id) {
    const note = notesList.find(note => note.id === id)
    if (!note) throw new Error('Note not found')
    return notesList.find(note => note.id === id)
  }

  // Create a note
  static createNote(title, content) {
    if (!title || title.length > 50) {
      throw new Error('Title is required and must be less than 50 characters')
    }

    const note = new Note(title, content)
    notesList.push(note)
    return note
  }

  // Update a note
  static updateNote(id, title, content) {
    const note = notesList.find(note => note.id === id)
    if (!note) throw new Error('Note not found')

    if (title) {
      if (title.length > 50) {
        throw new Error('Title must be less than 50 characters')
      }
      note.title = title
    }

    if (content) {
      note.content = content
    }

    note.updatedAt = new Date().getTime()

    return note
  }

  // Delete a note
  static deleteNote(id) {
    const index = notesList.findIndex(note => note.id === id)
    if (index === -1) throw new Error('Note not found')
    
    notesList.splice(index, 1)
  }
}

module.exports = NotesService
