import { useState } from 'react'

const useGame = () => {

    const getGame = () => {
        const gameString = localStorage.getItem('wavelengthGame')
        if (gameString && gameString != 'undefined') {
            return JSON.parse(gameString)       
        } else {
            return null
        }
    }

    const [game, setGame] = useState(getGame())
    
    const saveGame = (game) => {
        localStorage.setItem('wavelengthGame', JSON.stringify(game))
        setGame(game)
    }

    const clearGame = () => {
        localStorage.removeItem('wavelengthGame')
        setGame(null)
    }

    return {
        game,
        setGame: saveGame,
        clearGame,
    }
}

export default useGame;