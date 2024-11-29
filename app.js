const express = require('express')
const app = express()
const config = require('./config')
const PORT = config.port
const notesRouter = require('./routes/notes')

app.use(express.json())
app.use('/notes', notesRouter)

app.use((req, res) => {
  res.status(404).json({ error: 'API Not Found' })
})

app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`)
}).on('error', (err) => {
  console.log(err)
  process.exit(1)
})

module.exports = app
