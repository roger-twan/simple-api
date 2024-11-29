const express = require('express')
const router = express.Router()
const NotesService = require('../services/notes')

// Get all notes
router.get('/', (req, res) => {
  const notes = NotesService.getAllNotes()
  res.status(200).json(notes)
})

// Get a note by ID
router.get('/:id', (req, res) => {
  try {
    const note = NotesService.getNoteById(req.params.id)
    res.status(200).json(note)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
})

// Create a note
router.post('/', (req, res) => {
  try {
    const { title, content } = req.body
    const note = NotesService.createNote(title, content)
    res.status(201).json(note)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update a note
router.patch('/:id', (req, res) => {
  try {
    const { title, content } = req.body
    const note = NotesService.updateNote(req.params.id, title, content)
    res.status(200).json(note)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete a note
router.delete('/:id', (req, res) => {
  try {
    NotesService.deleteNote(req.params.id)
    res.status(204).send()
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
})

module.exports = router
