import { useState } from 'react'
const defaultGame = {
    host: 'host',
    code: 'code',
    totalUsers: 0,
    users: [],
    teams: [[],[],[]],
    playing: false,
    score: [0,0],
    turn: 1,
    phase: 1,
    round: 1,
    target: 50,
    screen: false,
    range: [],
    discard: [],
    psych: ['',''],
    psychUsed: [[],[]],
    guess: 50,
    secondGuess: 1,
    clue: '',
    dateCreated: Date.now(),
    dateUpdated: Date.now(),
}

const useGame = () => {

    var getGame = () => {
        const gameString = localStorage.getItem('wavelengthGame')
        if (gameString && gameString != 'undefined') {
            return JSON.parse(gameString)       
        } else {
            // return null
            localStorage.setItem('wavelengthGame', JSON.stringify(defaultGame))
            return defaultGame
        }
    }

    const [game, setGame] = useState(getGame())
    
    var saveGame = (game) => {
        localStorage.setItem('wavelengthGame', JSON.stringify(game))
        setGame(game)
    }

    var clearGame = () => {
        localStorage.removeItem('wavelengthGame')
        setGame(null)
    }

    var resetGame = () => {
        localStorage.removeItem('wavelengthGame')
        setGame(getGame())
        return defaultGame
    }

    return {
        game,
        setGame: saveGame,
        clearGame,
        resetGame,
    }
}

export default useGame;