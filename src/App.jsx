import { useEffect, useState } from 'react'
import Board from './board.jsx'
import WinPopUp from './winPopUp.jsx'
import DifficultySlider from './difficultySlider.jsx'
import './App.css'
import LosePopUp from './losePopUp.jsx'

function App() {
  const [currentGuess, setCurrentGuess] = useState('')
  const [previousGuesses, setPreviousGuesses] = useState([])// an array of the previous guesses
  const [answer, setAnswer] = useState('')
  const [gameState, setGameState] = useState('preGame')
  const [guessesAllowed, setGuessesAllowed] = useState(6)

  // reads in the csv and sets 'answer' to a random word from the csv
  async function loadCSV() {
    const response = await fetch('./5_letters.csv');
    const csvData = await response.text();
    setAnswer(String(csvData.split(",")[Math.floor(Math.random() * 2499)].slice(0, -1).slice(1)));
  }

  // resets the game state and gets a new word
  const newWordF = (event) => {
    setCurrentGuess('')
    setPreviousGuesses([])
    setGameState('preGame')
    loadCSV()
    // fixes a bug where hitting enter resets the game after hitting the new word button
    event.target.blur()
  }

  const closeWinPopUp = () => {
    setGameState('showingWon')
  }
  const closeLostPopUp = () => {
    setGameState('showingLoss')
  }

  useEffect(() => {
    if (gameState === "preGame") {
      if (guessesAllowed-1 > previousGuesses.length) {
        setPreviousGuesses([...previousGuesses, "     "])
      } else if (guessesAllowed-1 < previousGuesses.length) {
        setPreviousGuesses(prevItems => prevItems.slice(0, -1))
      }
    }
  }, [guessesAllowed, previousGuesses, gameState])

  // runs at the start
  useEffect(() => {
    loadCSV()
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
        if (gameState === "preGame") {
          setPreviousGuesses([])
          setGameState("playing")
        }
        // Adding a letter to the current guess
        if (event.key.match(/^[a-zA-Z]$/) && currentGuess.length < 5) {
          setCurrentGuess(currentGuess + event.key.toUpperCase())
        }
        // Removing a letter from the current guess
        if (event.key === 'Backspace' && (gameState === "playing" || gameState === "preGame")) {
          if (currentGuess.length == 1 || currentGuess.length == 0) {
            setCurrentGuess('')
          } else {
            setCurrentGuess(currentGuess.slice(0, -1))
          }
        }
        // Submitting a guess
        if (event.key === 'Enter' && currentGuess.length == 5) {
          if (gameState === "showingLoss" || gameState === "showingWon") {
            pass
          } else {
            if (answer === currentGuess.toLowerCase()) {
              console.log("You win")
              setGameState("won")
            } else {
              if (previousGuesses.length + 1 >= guessesAllowed) {
                console.log("You lost")
                setGameState("lost")
              } else {
                setPreviousGuesses([...previousGuesses,currentGuess])
                setCurrentGuess('')
                setGameState('playing')
              }
            }
          }
        }
      }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentGuess, previousGuesses, gameState, guessesAllowed])

  return (
    <>
      <h1>WORDLE</h1>
      <DifficultySlider guessesAllowed={guessesAllowed} setGuessesAllowed={setGuessesAllowed} gameState={gameState}/>
      <button type="button" className='newWord' onClick={newWordF}>New Word</button>
      <Board currentGuess={currentGuess} previousGuesses={previousGuesses} answer={answer} gameState={gameState} />
      <WinPopUp gameState={gameState} resetGame={closeWinPopUp} />
      <LosePopUp gameState={gameState} resetGame={closeLostPopUp} answer={answer} />
    </>
  )
}

export default App
