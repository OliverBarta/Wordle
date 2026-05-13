import { useEffect, useState } from 'react'
import Board from './board.jsx'
import './App.css'

function App() {
  const [currentGuess, setCurrentGuess] = useState('')
  const [previousGuesses, setPreviousGuesses] = useState([])// an array of the previous guesses
  const [answer, setAnswer] = useState('')
  const [gameState, setGameState] = useState('playing')// either set to 'playing' or 'won'
  
  // reads in the csv and sets 'answer' to a random word from the csv
  async function loadCSV() {
    const response = await fetch('./5_letters.csv');
    const csvData = await response.text();
    setAnswer(String(csvData.split(",")[Math.floor(Math.random() * 2499)].slice(0, -1).slice(1)))
  }

  // resets the game state and gets a new word
  const newWordF = (event) => {
    setCurrentGuess('')
    setPreviousGuesses([])
    setGameState('playing')
    loadCSV()
    // fixes a bug where hitting enter resets the game after hitting the new word button
    event.target.blur()
  }

  // runs at the start
  useEffect(() => {
    loadCSV()
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
        // Adding a letter to the current guess
        if (event.key.match(/^[a-zA-Z]$/) && currentGuess.length < 5) {
          setCurrentGuess(currentGuess + event.key.toUpperCase())
        }
        // Removing a letter from the current guess
        if (event.key === 'Backspace' && gameState === "playing") {
          if (currentGuess.length == 1 || currentGuess.length == 0) {
            setCurrentGuess('')
          } else {
            setCurrentGuess(currentGuess.slice(0, -1))
          }
        }
        // Submitting a guess
        if (event.key === 'Enter' && currentGuess.length == 5) {
          if (answer === currentGuess.toLowerCase()) {
            console.log("You win")
            setGameState("won")
          } else {
            setPreviousGuesses([...previousGuesses,currentGuess])
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
