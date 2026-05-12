import { useEffect, useState } from 'react'
import Board from './board.jsx'
import './App.css'



function App() {
  const [currentGuess, setCurrentGuess] = useState('')//'' means initialize as string
  const [previousGuesses, setPreviousGuesses] = useState([])//[] means initialize as array

  useEffect(() => {
    const handleKeyDown = (event) => {
        // console.log(currentGuess)
        if (event.key.match(/^[a-zA-Z]$/) && currentGuess.length < 5) {
          setCurrentGuess(currentGuess + event.key.toUpperCase())
        }
        if (event.key === 'Backspace') {
          if (currentGuess.length == 1 || currentGuess.length == 0) {
            setCurrentGuess('')
          } else {
            setCurrentGuess(currentGuess.slice(0, -1))
          }
        }
        if (event.key === 'Enter' && currentGuess.length == 5) {
          setPreviousGuesses([...previousGuesses,currentGuess])
          // console.log("Prev g f: ", previousGuesses)
          setCurrentGuess('')
        }
      }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentGuess, previousGuesses])

  return (
    <>
      <h1>WORDLE</h1>
      <button type="button" className='newWord'>New Word</button>
      <Board currentGuess={currentGuess} previousGuesses={previousGuesses} />
    </>
  )
}

export default App
