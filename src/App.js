import { useState, useEffect } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImage = [
  { src: '/img/helmet-1.png' },
  { src: '/img/potion-1.png' },
  { src: '/img/ring-1.png' },
  { src: '/img/scroll-1.png' },
  { src: '/img/shield-1.png' },
  { src: '/img/sword-1.png' },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurn] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  // shuffle the cards
  const shuffleCard = () => {
    const shuffledCard = [...cardImage, ...cardImage]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setCards(shuffledCard)
    setTurn(0)
  }

  // handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  // compare card
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        console.log('same card')
        resetTurn()
      } else {
        console.log('different card')
        resetTurn()
      }
    }
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurn((prevTurns) => prevTurns + 1)
  }

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCard}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard card={card} key={card.id} handleChoice={handleChoice} />
        ))}
      </div>
    </div>
  )
}

export default App
