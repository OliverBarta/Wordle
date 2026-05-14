import emptyPng from './assets/emptytrumpetsmirrored.png'
import './winPopUp.css'

function LosePopUp({gameState, resetGame, answer}) {
    // render nothing if the game isn't won
    if (gameState !== "lost") return null;

    return (
        <>
            <div className='housing'>
                <img src={emptyPng} className='trumpetLeft' alt="sadFacePng"></img>
                <div className='bigSquareLose'>
                    <div className='youWin'>You lose!</div>
                    <div>Word was: "{answer}"</div>
                    <button type="button" onClick={resetGame} className='close'>Close</button>
                </div>
                <img src={emptyPng} className='trumpetRight' alt="sadFacePng"></img>
            </div>
        </>
    )
}

export default LosePopUp