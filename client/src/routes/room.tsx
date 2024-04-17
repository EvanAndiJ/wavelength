import React, { useState, useEffect, } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import {configureAbly, useChannel, usePresence } from "@ably-labs/react-hooks";

import http from '../scripts/http';
import useTeams from '../hooks/useTeams';
import useGame from '../hooks/useGame';
import useUser from '../hooks/useUser';
import ranges from '../assets/ranges.js'


import { GameContext, UserContext, ColorContext } from '../context/Contexts.ts';
import TargetArea from '../components/TargetArea.room.tsx';
import GameArea from '../components/GameArea.room.tsx';
import PlayerArea from '../components/PlayerArea.room.tsx';
import DrawRanges from '../components/DrawRanges.room.tsx';
import HowTo from '../components/HowTo.App.tsx';
import Win from '../components/Win.Room.tsx';
import Menu from '../components/Menu.App.tsx'

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

export default function Room() {
    const [err, setErr] = useState<string>()
    const { roomCode } = useParams()
    const { teams, setTeams} = useTeams()
    const { game, setGame, resetGame } = useGame()
    const { user, setUser } = useUser()

    const [isDraw, setIsDraw] = useState(true)
    const [drawn, setDrawn] = useState<[String[], Number][]>([])
    const [screen, setScreen] = useState(game.screen)
    const toggleScreen = () => setScreen(!screen)

    const [winner, setWinner] = useState(0)
    const [showWin, setShowWin] = useState(false)
    const toggleWin = () => setShowWin(!showWin)

    const [howTo, setHowTo] = useState(false)
    const toggleHowTo = () => setHowTo(!howTo)

    const [guessLock, setGuessLock] = useState((game?.playing && game?.phase === 4) ? true : false)

    useEffect(()=>{
        if (game) {
            if (Date.now() - game.dateUpdated > 360000) {
                resetGame()
                setGame(defaultGame)
            }
        }
    },[])
    
    function gameToggle () {
        if (game.playing) {
            setGame({...game, playing: false})
        } else {
            setIsDraw(true)
            setGame({...game, playing: true, score: [0,0]})
            // setGame({...game, playing: true})
        }
    }
    function changeTeams(team: number, psych:number) {
        user.team = team
        user.psych = psych ? true : false
        setUser(user)
        // userChannel.publish('changeTeams', { _id: user._id, team, psych})
    }
    function drawRanges() {
        const drawn: Number[] = []
        const getRange = () => {

            let range: [String[], Number];

            let i = Math.floor(Math.random() * ranges.length)

            let selected: [String[], Number] = [ranges[i], i]

            if (game.discard.includes(i) || drawn.includes(i)) {
              range = getRange() 
            } else {
              range = selected
              drawn.push(i)
            }
            return range
          }

          let pool: [String[], Number][] = []

          while (pool.length < 3) {
            const r = getRange()
            pool.push(r)
          }
          
          setDrawn(pool)
        // userChannel.publish('drawRanges', roomCode)
    }
    function chooseRange(range) {
        // userChannel.publish('chooseRange', {roomCode, range})
        const newGame = {...game}
        const oldRange = game.range
        if ( oldRange.length ) {
            newGame.discard.push(Number(oldRange[1][0]));
        }
        newGame.range = range;
        newGame.target = Math.floor(Math.random() * 100);
        newGame.secondGuess = 1;
        newGame.clue = '';
        setGame(newGame)
        setIsDraw(false)
        setDrawn([])

        setScreen(false)
        setGuessLock(true)
    }
    function setClue(clue: string) {
        if (clue) {
            // userChannel.publish('setClue', { roomCode, clue })
            setGame({...game, clue: clue, phase: 2, screen: true})
            setScreen(true)
            setGuessLock(false)
            setErr('')
        } else {
            setErr('No Clue Given')
        }   
    }
    function updateGuess(newGuess: string) {
        // userChannel.publish("guess", { roomCode, guess: newGuess });
        setGame({...game, guess: newGuess})
    }
    function submitGuess() {
        // userChannel.publish("submitGuess", { roomCode, guess: game.guess });
        setGame({...game, phase: 3})

    }
    function changeSecondGuess(side: string) {
        // userChannel.publish('overUnder', {roomCode, side})
        const newGame = {...game};
        if (side === 'l') {
            newGame.secondGuess = newGame.secondGuess === 0 ? 1 : 0
        } else 
        if (side === 'r') {
        newGame.secondGuess = newGame.secondGuess === 2 ? 1 : 2
        }
        setGame(newGame)
    }
    function submitSecondGuess() {
        // userChannel.publish('submitSecondGuess', {roomCode})
        const newGame = {...game}
        let score = 0;
        const guess = newGame.guess
        const second = newGame.secondGuess
        if (guess <= newGame.target+2 && guess >= newGame.target-2) {
          score = 4;
        } else if (guess <= newGame.target+7 && guess >= newGame.target-7) {
          score = 3;
        } else if (guess <= newGame.target+12 && guess >= newGame.target-12) {
          score = 2;
        } else {
          score = 0;
        }
        newGame.score[newGame.turn-1] += score
        if (second < 1 && newGame.target < guess) {
          newGame.score[newGame.turn === 1 ? 1 : 0] += 1
        } else 
        if (second > 1 && newGame.target > guess) {
          newGame.score[newGame.turn === 1 ? 1 : 0] += 1
        }
      
        if (newGame.turn === 2) { newGame.round++ }
        newGame.turn = newGame.turn === 1 ? 2 : 1;
        newGame.phase = 1       
        // setGame(newGame)
        
        setScreen(false)
        // if (newGame.score[0] >= 10 || newGame.score[1] >= 10) {
        if (newGame.score[0] >= 3 || newGame.score[1] >= 3) {
            setWinner(newGame.score[0] >= 3 ? 1 : 2)
            setShowWin(true)
            // resetGame()
            newGame.turn = 1
            newGame.round = 1
            newGame.playing = false
            newGame.clue = ''
            newGame.range = []
            newGame.discard = []
            newGame.secondGuess = 1
        } else {
            // setGuessLock(data.teams[data.turn].includes(user.name) ? false : true)
            setIsDraw(true)
        }
        setGame(newGame)
    }
        
    return (
        <div id='gameRoom'>
            <div className='topbar'>
            { game.playing ? 
                <div className='tooltip-bar m-auto'>  
                    {game.phase === 1 ? `Team ${game.turn} psychic, draw a range and enter a clue`
                    : game.phase === 2 ? `Team ${game.turn} move the slider to the location of the target`
                    : game.phase === 3 ? `Team ${game.turn === 2 ? 1 : 2} click left or right for the side you think the target is on`
                    : null
                    }

                </div> : null}
                <div className="absolute top-0 right-0">
                    <button className='topbarButton' onClick={toggleHowTo}>
                        <img src='/wavelength/question-circle-white.svg' alt='How To Play'/>
                    </button>
                </div>
            </div>

            
            { err && <div> {err} </div>}

            <div id="gameBoard">

                <HowTo show={howTo} toggleShow={toggleHowTo}/>

            <GameContext.Provider value={game}>
            <UserContext.Provider value={user}>

                <TargetArea  
                screen={screen}
                guessLock={guessLock}
                updateGuess={updateGuess}
                toggleScreen={toggleScreen}
                />

                <GameArea 
                gameToggle={gameToggle}
                isDraw={isDraw}
                onDraw={drawRanges}
                setClue={setClue} 
                submitGuess={submitGuess}
                changeSecondGuess={changeSecondGuess}
                submitSecondGuess={submitSecondGuess}
                />

                <PlayerArea 
                game={game}
                user={user}
                onJoin={changeTeams} 
                />

                <DrawRanges 
                ranges={drawn} 
                choose={chooseRange} 
                hide={()=>setDrawn([])}
                />
                
                <Win show={showWin} toggleShow={toggleWin} team={winner}/>
            </UserContext.Provider>
            </GameContext.Provider>
            </div>
        </div>
    )
}