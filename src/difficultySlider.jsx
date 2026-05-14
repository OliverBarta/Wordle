import './difficultySlidder.css'

function DifficultySlider({guessesAllowed, setGuessesAllowed, gameState}) {

    return (
        <>
            <div className='housingDifficulty'>

                {gameState === "preGame" && <button onClick={() => guessesAllowed > 1 && setGuessesAllowed(guessesAllowed - 1)} type="button">-</button>}
                <div>Guesses: {guessesAllowed}</div>
                {gameState === "preGame" && <button onClick={() => setGuessesAllowed(guessesAllowed + 1)} type="button">+</button>}
            </div>
        </>
    )
}

export default DifficultySlider