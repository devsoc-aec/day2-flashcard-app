import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 5000

// Middleware
app.use(cors())
app.use(express.json())

// In-memory storage
let decks = []
let cards = []

// Routes
app.get('/api/data', (req, res) => {
  res.json([])
})

app.get('/api/decks', (req, res) => {
  res.json(decks)
})

app.post('/api/decks', (req, res) => {
  const deck = { id: Date.now(), ...req.body }
  decks.push(deck)
  res.json(deck)
})

app.get('/api/cards', (req, res) => {
  const deckId = req.query.deckId
  const filtered = deckId ? cards.filter(c => c.deckId === parseInt(deckId)) : cards
  res.json(filtered)
})

app.post('/api/cards', (req, res) => {
  const card = { id: Date.now(), ...req.body }
  cards.push(card)
  res.json(card)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
