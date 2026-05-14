
import './board.css'

function Board({currentGuess, previousGuesses, answer, gameState, guessesAllowed}) {
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
    return (
        <section>
            <div className="board">
                {/* The row(s) with the previous guess(es) */}
                {previousGuesses.map((guess, i) => (
                    <div key={i} className='Row'>
                        {guess.split("").map((letter, j) => (
                            <div key={j} className={
                                answer[j] === letter.toLowerCase() ? "SquareGreen" :
                                checkYellow(guess, letter, answer, j) ? "SquareYellow" :
                                "Square"
                            }
                            >
                            {letter}
                            </div>
                        ))}
                    </div>
                ))}
                {/* The row with the current guess */}
                <div className="Row">
                    {[0,1,2,3,4].map(i => (
                        <div key={i} className={gameState === "won" || gameState === "showingWon" ? "SquareGreen" : 
                        gameState === "lost" || gameState === "showingLoss" ? "SquareRed" :
                        "Square"}>
                        {currentGuess[i] || ''}
                        </div>
                    ))}
                </div>
                {/* The grey squares, unguessed rows */}
                {Array.from({length: guessesAllowed-1-previousGuesses.length}, (_, i) => (
                    <div key={i} className="Row">
                        {"     ".split("").map((letter, j) => (
                            <div key={j} className='SquareGrey'>{letter}</div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Board