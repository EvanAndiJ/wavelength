import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import http, {NewRoom, newGameChannel} from '../scripts/http'
import useUser from "../hooks/useUser"
import useTeams from "../hooks/useTeams"
import useGame from "../hooks/useGame"

export default function Start() {
    const nav = useNavigate()
    const {user, setUser} = useUser()
    const {teams, setTeams} = useTeams()
    const {game, setGame} = useGame()
    const [roomCode, setRoomCode] = useState(user ? user.room : '')
    const [name, setName] = useState(user ? user.name : '')
    const [err, setErr] = useState('')

    const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.name
        const value = event.target.value
        switch(input) {
            case 'room': setRoomCode(value)
                break;
            case 'name': setName(value)
                break;
        }
    }
    async function newRoom () {
        const res = await NewRoom(name)
        // newGameChannel(res.game.code)
        setUser(res.creator)
        setTeams(res.game.teams)
        setGame(res.game)
        nav(`/wavelength/room/${res.game.code}`)
    }
    async function joinRoom() {
        // console.log('joinRoom')
        const res = user ? await http.joinRoom(name, roomCode, user._id)
                : await http.joinRoom(name, roomCode)
        if (res.err) {
            setErr(res.err)
        } else {
            // console.log(res)
            setUser(res.user)
            setTeams(res.game.teams)
            setGame(res.game)
            nav(`/wavelength/room/${res.game.code}`)
        }
    }
    
    return (
        <div className='startMenu'>
            {/* <button onClick={()=>console.log(user)}>user</button> */}
            {/* <button onClick={()=>console.log(name, roomCode)}>start page</button> */}
            <label>Room Code: <span>{err}</span></label>
            <input name='room' type='text' 
                placeholder="Enter 4-Digit Code"
                value={roomCode} onChange={onInput}/>

            <label>Name:</label>
            <input name='name' type='text' placeholder="Enter Your Name"
                value={name} onChange={onInput}/>

            <button className='startButtons gameButtons'
                disabled={roomCode.length === 4 ?  false : true} onClick={joinRoom}>
                Join</button>
            <button className='startButtons gameButtons'
                disabled={name.length ?  false : true} onClick={newRoom}>
                New</button>
        </div>
    )
}