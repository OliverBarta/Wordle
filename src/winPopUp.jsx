import { useEffect, useRef } from 'react'

import trumpetRight from './assets/trumpetsimage-Photoroom.png'
import trumpetLeft from './assets/trumpetsmirrored.png'
import './winPopUp.css'

function WinPopUp({gameState, resetGame}) {
    
    // render nothing if the game isn't won
    const canvasRef = useRef(null)

    useEffect(() => {
        if (gameState !== "won") return
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const particles = Array.from({ length: 250 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6,
            alpha: 1,
            color: `hsl(${Math.random() * 360}, 100%, 60%)`,
            size: Math.random() * 4 + 2,
        }))

        let animFrame
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            particles.forEach(p => {
                p.x += p.vx
                p.y += p.vy
                p.vy += 0.1
                p.alpha -= 0.01
                ctx.globalAlpha = p.alpha
                ctx.fillStyle = p.color
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fill()
            })
            animFrame = requestAnimationFrame(animate)
        }
        animate()
        return () => cancelAnimationFrame(animFrame)
    }, [gameState])

    if (gameState !== "won") return null

    return (
        <>
            <canvas ref={canvasRef} className="fireworks-canvas" />
            <div className='housing'>
                <img src={trumpetLeft} className='trumpetLeft' alt="trumpetLeft"></img>
                <div className='bigSquare'>
                    <div className='youWin'>You Win!</div>
                    <button type="button" onClick={resetGame} className='close'>Close</button>
                </div>
                <img src={trumpetRight} className='trumpetRight' alt="trumpetRight"></img>
            </div>
        </>
    )
}

export default WinPopUp