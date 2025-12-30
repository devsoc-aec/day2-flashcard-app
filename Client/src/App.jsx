import { useState, useEffect } from 'react'

function App() {
  const [decks, setDecks] = useState([])
  const [cards, setCards] = useState([])
  const [selectedDeck, setSelectedDeck] = useState(null)
  const [currentCard, setCurrentCard] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    fetchDecks()
  }, [])

  useEffect(() => {
    if (selectedDeck) {
      fetchCards(selectedDeck.id)
    }
  }, [selectedDeck])

  const fetchDecks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/decks').then(res => res.json())
      setDecks(response.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const fetchCards = async (deckId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cards?deckId=${deckId}`).then(res => res.json())
      setCards(response.data)
      setCurrentCard(0)
      setShowAnswer(false)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const nextCard = () => {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1)
      setShowAnswer(false)
    }
  }

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1)
      setShowAnswer(false)
    }
  }

  if (selectedDeck && cards.length > 0) {
    const card = cards[currentCard]
    return (
      <div className="container">
        <button onClick={() => setSelectedDeck(null)} style={{ marginBottom: '20px' }}>
          ← Back to Decks
        </button>

        <div className="card">
          <h2>{selectedDeck.name}</h2>
          <p style={{ color: '#666' }}>Card {currentCard + 1} of {cards.length}</p>
        </div>

        <div
          className="card"
          style={{
            minHeight: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: showAnswer ? '#e7f3ff' : '#fff3e0',
            cursor: 'pointer'
          }}
          onClick={() => setShowAnswer(!showAnswer)}
        >
          <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>
            {showAnswer ? 'Answer' : 'Question'}
          </h3>
          <p style={{ fontSize: '24px', textAlign: 'center' }}>
            {showAnswer ? card.answer : card.question}
          </p>
          <p style={{ marginTop: '30px', color: '#666', fontSize: '14px' }}>
            Click to flip
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button onClick={prevCard} disabled={currentCard === 0} style={{ flex: 1 }}>
            ← Previous
          </button>
          <button onClick={nextCard} disabled={currentCard === cards.length - 1} style={{ flex: 1 }}>
            Next →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>🎴 Flashcard App</h1>

      <div className="card">
        <h2>My Decks ({decks.length})</h2>
        {decks.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>No decks available.</p>
        ) : (
          <div style={{ display: 'grid', gap: '15px' }}>
            {decks.map(deck => (
              <div
                key={deck.id}
                className="card"
                style={{ margin: 0, background: '#f8f9fa', cursor: 'pointer' }}
                onClick={() => setSelectedDeck(deck)}
              >
                <h3 style={{ margin: '0 0 10px 0' }}>{deck.name}</h3>
                <p style={{ margin: 0, color: '#666' }}>Click to study</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
