import React, { useState, useEffect, } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import {configureAbly, useChannel, usePresence } from "@ably-labs/react-hooks";

import http from '../scripts/http';
import useTeams from '../hooks/useTeams';
import useGame from '../hooks/useGame';
import useUser from '../hooks/useUser';

//@ts-ignore
import { GameContext, UserContext } from '../context/Contexts.ts';
//@ts-ignore
import TargetArea from '../components/TargetArea.room.tsx';
//@ts-ignore
import GameArea from '../components/GameArea.room.tsx';
//@ts-ignore
import PlayerArea from '../components/PlayerArea.room.tsx';
//@ts-ignore
import DrawRanges from '../components/DrawRanges.room.tsx';
//@ts-ignore
import HowTo from '../components/HowTo.App.tsx';
//@ts-ignore
import Win from '../components/Win.Room.tsx';
//@ts-ignore
import Menu from '../components/Menu.App.tsx'

export default function Room() {
    const [err, setErr] = useState<string>()
    const { roomCode } = useParams()
    const { teams, setTeams} = useTeams()
    const { game, setGame } = useGame()
    const { user, setUser } = useUser()

    const [isDraw, setIsDraw] = useState(true)
    const [drawn, setDrawn] = useState([])
    const [screen, setScreen] = useState(false)
    const toggleScreen = () => setScreen(!screen)

    const [winner, setWinner] = useState(0)
    const [showWin, setShowWin] = useState(false)
    const toggleWin = () => setShowWin(!showWin)

    const [howTo, setHowTo] = useState(false)
    const toggleHowTo = () => setHowTo(!howTo)

    const [guessLock, setGuessLock] = useState((game.playing && game.phase === 4) ? true : false)

    const realtime = configureAbly({ authUrl: "/auth" });
    realtime.connection.once('connected', async ()=> {
        // console.log('connected')
        if (user.ably !== realtime.auth.clientId) {
            const res = await http.addClientId(roomCode, user._id, realtime.auth.clientId)
            setUser(res.user)
        }
    })
    const [gameRoom] = useChannel(`gameRoom${roomCode}`, 
        (update) => {
        const post = update.name
        const data = update.data
        if (post === 'gameState') {
            if (!data.playing) {
                setScreen(data.screen)
            }
            setGame(data)
            // setTeams(update.data.teams)
            if (data.phase > 2) { setGuessLock(true) }
        }
        if (post === 'gameStart') {
            // console.log('start', data)
            // const newGame = update.data
            setGame(data);
            setGuessLock(data.teams[2].includes(user.name) ? true : false)
        }
        if (post === 'gameStop') {
            setGame(update.data)
            setGuessLock(false)
        }
        if (post === 'nextTurn') {
            // console.log('next', data)
            setGame(update.data)
            setScreen(false)
            if (update.data.score[0] >= 10 || update.data.score[1] >= 10) {
                setWinner(update.data.score[0] >= 10 ? 1 : 2)
                setShowWin(true)
            } else {
                setGuessLock(data.teams[data.turn].includes(user.name) ? false : true)
                setIsDraw(true)
            }
        }
        if (post === 'teams') {
            // console.log('teams')
            setTeams(update.data)
            game.teams = update.data
            setGame(game)
        }
        if (post === 'psychs') {
            // console.log('psychs')
            // const newGame = {...game}
            game.psych = update.data
            setGame(game)
        }
        if (post === 'drawnRanges') {
            setDrawn(update.data)
        }
        if (post === 'closeScreen') {
            setScreen(true)
        }
        if (post === 'err') {
            setErr(data)
        }
        // switch(post) { 
        //     case 'gameState':
        //         if (!update.data.playing) {
        //             setScreen(update.data.screen)
        //         }
        //         setGame(update.data)
        //         // setTeams(update.data.teams)
        //         if (update.data.phase > 2) { setGuessLock(true) }
        //         break;
        //     case 'gameStart':
        //         const newGame = update.data
        //         // setTeams(newGame.teams);
        //         setGame(newGame);
        //         // setScreen(update.data.psych[0] === user.name ? false : true)
        //         setGuessLock(user.team === 2 ? true : false)
        //         break;
        //     case 'nextTurn':
        //         const newGame = update.data
        //         setGame(newGame)
        //         setScreen(false)
        //         setGuessLock(true)
        //         break;
        //     case 'teams':
        //         // console.log('teams')
        //         setTeams(update.data)
        //         game.teams = update.data
        //         setGame(game)
        //         break;
        //     case 'psychs':
        //         // console.log('psychs')
        //         // const newGame = {...game}
        //         game.psych = update.data
        //         setGame(game)
        //         break;
        //     case 'drawnRanges':
        //         setDrawn(update.data)
        //         break;
        //     case'closeScreen':
        //         setScreen(true)
        //         break;
        // }
    })
    const [presence] = usePresence(`gameRoom${roomCode}`, {name: user.name, roomCode})
    const [userChannel] = useChannel(`userChannel-${user.ably ? user.ably : realtime.auth.clientId}`, 
        (update) => {
            if (update.name === 'drawnRanges') {
                if (update.data === 'done') {
                    setDrawn([])
                } else {
                    setDrawn(update.data)
                }
            }
            if (update.name === 'updateUser') {
                setUser(update.data)
            }
        }
    )

    // Start and End the game
    function gameToggle () {
        
        if (!game.playing) {
            // if (game.totalUsers >= 4) {
                userChannel.publish('start', roomCode)
            // } else {
            //     setErr('Not Enough Players')
            // }
        } else {
            userChannel.publish('stop', roomCode)
        }
    }
    function changeTeams(team: number, psych:number) {
        user.team = team
        user.psych = psych ? true : false
        setUser(user)
        userChannel.publish('changeTeams', { _id: user._id, team, psych})
    }
    function drawRanges() {
        userChannel.publish('drawRanges', roomCode)
    }
    function chooseRange(range) {
        userChannel.publish('chooseRange', {roomCode, range})
        setScreen(false)
        setGuessLock(true)
        setIsDraw(false)
    }
    function getTarget() { 
        userChannel.publish('target', roomCode)
    }
    function setClue(clue: string) {
        if (clue) {
            userChannel.publish('setClue', { roomCode, clue })
        } else {
            setErr('No Clue Given')
        }   
    }
    function updateGuess(newGuess: string) {
        userChannel.publish("guess", { roomCode, guess: newGuess });
    }
    function submitGuess() {
        userChannel.publish("submitGuess", { roomCode, guess: game.guess });
    }
    function changeSecondGuess(side: string) {
        userChannel.publish('overUnder', {roomCode, side})
    }
    function submitSecondGuess() {
        userChannel.publish('submitSecondGuess', {roomCode})
    }
    
    function nextTurn() {
        userChannel.publish(`nextTurn`, roomCode)
    }
    function ping() {
        console.log('ping')
        userChannel.publish('showMe', 'showMe')
    }
    function unsub() {
        console.log('unsub')
        userChannel.publish('unsub', 'unsub')
    }
    function reconnect() {
        //LOOK INTO THIS ERRor: Mismatched clientId for existing connection
        gameRoom.publish('resub', userChannel.name)
    }
    function reset() {
        userChannel.publish('gcClean', roomCode)
    }
        
    return (
        <div id='gameRoom'>
            <Menu gameToggle={gameToggle}/>
            <button onClick={()=>console.log(realtime)}>game</button> 
            {/* <button onClick={()=>console.log(user)}>user</button>
            <button onClick={()=>console.log(presence)}>pres</button>
            <button onClick={nextTurn}>turn+</button>
            <button onClick={ping}>print</button>
            <button onClick={()=>console.log(screen)}>screen</button>
            
            <button onClick={reset}>reset</button>
            <button onClick={reconnect}>resub</button> */}
            <br/>
            Game Room {roomCode}

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

            </UserContext.Provider>
            </GameContext.Provider>
            
                <DrawRanges 
                ranges={drawn} 
                choose={chooseRange} 
                hide={()=>setDrawn([])}
                />
                
                <Win show={showWin} toggleShow={toggleWin} team={winner}/>
                
            </div>
        </div>
    )
}