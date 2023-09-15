import React, { useState } from "react"
import http, { 
    adminLogin,
    getUserChannels, 
    removeUserChannel, 
    getGameChannels, 
    removeGameChannel,
    newGameChannel, 
    newUserChannel, 
    cleanupGameChannels } from '../scripts/http'

export default function Dash() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [pass, setPass] = useState('')
    const onPassInput = (event) => {
        setPass(event.target.value)
    }
    const [newUserChan, setNewUserChan] = useState('')
    const onNewUserIn = (event) => {
        setNewUserChan(event.target.value)
    }
    const [newGameChan, setNewGameChan] = useState('')
    const onNewGameIn = (event) => {
        setNewGameChan(event.target.value)
    }

    const [users, setUsers] = useState([])
    const [games, setGames] = useState([])
    
    const getUsers = async () => {
        const channels = await getUserChannels()
        setUsers(channels.userChannels)
        console.log(channels.userChannels)
    }
    const addUser = async () => {
        newUserChannel(newUserChan)
    }
    const removeUser = async (id: string) => {
        const newUsers = await removeUserChannel(id)
        // const newUsers = users.filter(user => user != id)
        setUsers(newUsers)
    }
    const getGames = async () => {
        const channels = await getGameChannels()
        setGames(channels.gameChannels)
        console.log(channels.gameChannels)
    }
    const addGame = async () => {
        newGameChannel(newGameChan)
    }
    const removeGame = async (roomCode: string) => {
        await removeGameChannel(roomCode)
        const newGames2 = games.filter(game => game != roomCode)
        setGames(newGames2)
    }
    const removeAllGames = async () => {
        const clean = await cleanupGameChannels()
        if (clean) {
            setGames([])
        }
    }

    const login = async () => {
        const res = await adminLogin(pass)
        if (res.auth) {
            setLoggedIn(true)
        }
    }

    return (
        <div>
            Dashbaord
            {loggedIn ?
            <div style={{display:'flex', flexDirection:'column'}}>

                <button onClick={removeAllGames}>cleanup Games</button>

                <div style={{ margin: '1em'}}>
                    <button onClick={getUsers}>userChannels</button>
                    {users ? users.map(user => (
                        <div key={user} style={{display:'flex'}}>
                            <p>{user}</p>
                            <button>x</button>
                        </div>
                    ))
                    : null}
                    <div style={{display:'flex'}}>
                        <input type='text' value={newUserChan} onChange={onNewUserIn}/>
                        <button onClick={addUser}>+</button>
                    </div>
                </div>

                <div style={{ margin: '1em'}}>
                    <button onClick={getGames}>gameChannels</button>
                    {games ? games.map(game => (
                        <div key={game} style={{display:'flex'}}>
                            <p>{game}</p>
                            <button onClick={()=>removeGame(game)}>x</button>
                        </div>
                    ))
                    : null}
                    <div style={{display:'flex'}}> 
                        <input type='text' value={newGameChan} onChange={onNewGameIn}/>
                        <button onClick={addGame}>+</button>
                    </div>
                </div>

            </div>

            : <div>
            <input type='password' value={pass} onChange={onPassInput}/>
            <button onClick={login}>log in</button>
            </div>
            }
        </div>
    )
}
