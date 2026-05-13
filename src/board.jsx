
import './board.css'

function Board({currentGuess, previousGuesses, answer}) {

    return (
        <section>
            <div className="board">
                {previousGuesses.map((guess, i) => (
                    <div key={i} className='Row'>
                        {guess.split("").map((letter, j) => (
                            <div key={j} className={
                                answer[j] === letter.toLowerCase() ? "SquareGreen" :
                                answer.includes(letter.toLowerCase()) ? "SquareYellow" :
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
                        <div key={i} className="Square">
                        {currentGuess[i] || ''}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Board