import { useEffect, useState } from 'react'
import Board from './board.jsx'
import './App.css'

function App() {
  const [currentGuess, setCurrentGuess] = useState('')
  const [previousGuesses, setPreviousGuesses] = useState([])
  const [answer, setAnswer] = useState('')
  const [gameState, setGameState] = useState('playing')
  
  async function loadCSV() {
    const response = await fetch('./5_letters.csv');
    const csvData = await response.text();
    setAnswer(String(csvData.split(",")[Math.floor(Math.random() * 2499)].slice(0, -1).slice(1)))
  }

  const newWordF = (event) => {
    setCurrentGuess('')
    setPreviousGuesses([])
    setGameState('playing')
    loadCSV()
    event.target.blur()
  }

  useEffect(() => {
    loadCSV()
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
        // console.log(currentGuess)
        if (event.key.match(/^[a-zA-Z]$/) && currentGuess.length < 5) {
          setCurrentGuess(currentGuess + event.key.toUpperCase())
        }
        if (event.key === 'Backspace' && gameState === "playing") {
          if (currentGuess.length == 1 || currentGuess.length == 0) {
            setCurrentGuess('')
          } else {
            setCurrentGuess(currentGuess.slice(0, -1))
          }
        }
        if (event.key === 'Enter' && currentGuess.length == 5) {
          if (answer === currentGuess.toLowerCase()) {
            console.log("You win")
            setGameState("won")
          } else {
            setPreviousGuesses([...previousGuesses,currentGuess])
            // console.log("Prev g f: ", previousGuesses)
            setCurrentGuess('')
          }
        }
      }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentGuess, previousGuesses, gameState])

  return (
    <>
      <h1>WORDLE</h1>
      <button type="button" className='newWord' onClick={newWordF}>New Word</button>
      <Board currentGuess={currentGuess} previousGuesses={previousGuesses} answer={answer} gameState={gameState} />
    </>
  )
}

export default App
