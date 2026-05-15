import { useEffect, useState } from 'react'
import './keyboard.css'

const ROWS = [
    ['Q','W','E','R','T','Y','U','I','O','P'],
    ['A','S','D','F','G','H','J','K','L'],
    ['ENTER','Z','X','C','V','B','N','M','⌫']
]

function Keyboard({ onLetter, onBackspace, onEnter, previousGuesses, answer }) {
    // arrays holding the yellow and green letters in any previous guess
    const [YellowKeys, setYellowKeys] = useState([])
    const [GreenKeys, setGreenKeys] = useState([])
    const [GreyKeys, setGreyKeys] = useState([])

    const handleClick = (key) => {
        if (key === '⌫') onBackspace()
        else if (key === 'ENTER') onEnter()
        else onLetter(key)
    }

    const checkYellow = (guess, letter, answer, index) => {
        // checks if a letter of a guess should be yellow (return true) or not (return false)
        var guessArr = guess.split("")
        var answerArr = answer.split("")

        // Removes green answers
        for (let i = 0; i < 5; i++) {
            if (guessArr[i].toLowerCase() === answerArr[i]) {
                guessArr[i] = ""
                answerArr[i] = ""
            }
        }

        // how many times the guess letter is in the answer and is not green (number of yellows)
        var guessLetterInAnswer = 0;
        for (let i = 0; i < 5; i++) {
            if (answerArr[i] === letter.toLowerCase()) {
                guessLetterInAnswer += 1
            }
        }

        while (guessLetterInAnswer > 0) {
            var indexOfLetter = guessArr.indexOf(letter)
            if (indexOfLetter === index) {
                return true
            }
            guessArr[indexOfLetter] = ""
            guessLetterInAnswer -= 1
        }

        return false
    };

    // fills the green key and yellow key arrays
    useEffect(() => {
        const newGreenKeys = []
        const newYellowKeys = []
        const newGreyKeys = []

        for (let guess = 0; guess < previousGuesses.length; guess++) {
          for (let i = 0; i < previousGuesses[guess].length; i++) {
            if (previousGuesses[guess][i].toLowerCase() === answer[i]) {
                newGreenKeys.push(previousGuesses[guess][i].toUpperCase())
            } else if (checkYellow(previousGuesses[guess], previousGuesses[guess][i], answer, i)) {
                newYellowKeys.push(previousGuesses[guess][i].toUpperCase())
            } else {
                newGreyKeys.push(previousGuesses[guess][i].toUpperCase())
            }
          }
        }
        
        setGreenKeys(newGreenKeys)
        setYellowKeys(newYellowKeys)
        setGreyKeys(newGreyKeys)
    }, [previousGuesses])

    return (
        <div className="keyboard">
            {ROWS.map((row, i) => (
                <div key={i} className="keyboard-row">
                    {row.map(key => (
                        <button key={key} className={GreenKeys.includes(key) ? "keyGreen" : YellowKeys.includes(key) ? "keyYellow" : GreyKeys.includes(key) ? "keyGrey" : "key"} onClick={() => handleClick(key)}>
                            {key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Keyboard