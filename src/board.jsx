
import './board.css'

function Board({currentGuess, previousGuesses, answer, gameState}) {
    const checkYellow = (guess, letter, answer, index) => {
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
                <div className="Row">
                    {[0,1,2,3,4].map(i => (
                        <div key={i} className={gameState === "won" || gameState === "showing" ? "SquareGreen" : "Square"}>
                        {currentGuess[i] || ''}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Board