import './keyboard.css'

const ROWS = [
    ['Q','W','E','R','T','Y','U','I','O','P'],
    ['A','S','D','F','G','H','J','K','L'],
    ['ENTER','Z','X','C','V','B','N','M','⌫']
]

function Keyboard({ onLetter, onBackspace, onEnter }) {
    const handleClick = (key) => {
        if (key === '⌫') onBackspace()
        else if (key === 'ENTER') onEnter()
        else onLetter(key)
    }

    return (
        <div className="keyboard">
            {ROWS.map((row, i) => (
                <div key={i} className="keyboard-row">
                    {row.map(key => (
                        <button key={key} className="key" onClick={() => handleClick(key)}>
                            {key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Keyboard