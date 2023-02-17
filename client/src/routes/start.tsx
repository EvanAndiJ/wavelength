import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Start() {
    const nav = useNavigate()
    const [roomCode, setRoomCode] = useState('')
    const [name, setName] = useState('')
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
        await fetch('/api/newRoom', {
            method: 'POST',
            headers: {
              'content-type':'application/json',
            },
            body: JSON.stringify({name})
          })
        .then(res => res.json())
        .then(res => {
            nav(`/room/${res.roomCode}`)
        })
    }
    async function joinRoom() {
        await fetch('/api/joinRoom', {
            method: 'POST',
            headers: {
              'content-type':'application/json',
            },
            body: JSON.stringify({name,roomCode})
          })
        .then(res => res.json())
        .then(res => {
            res.noRoom ? setErr(`Invalid Room Code!`)
            : nav(`/room/${res.roomCode}`)
        })
    }
    
    return (
        <div className='startMenu'>
            <button onClick={()=>console.log(name, roomCode)}>start page</button>
            <label>Room Code: <span>{err}</span></label>
            <input name='room' type='text' 
                placeholder="Enter 4-Digit Code"
                value={roomCode} onChange={onInput}/>

            <label>Name:</label>
            <input name='name' type='text' placeholder="Enter Your Name"
                value={name} onChange={onInput}/>

            <button disabled={roomCode.length === 4 ?  false : true} onClick={joinRoom}>Join</button>
            <button disabled={name.length ?  false : true} onClick={newRoom}>New</button>
        </div>
    )
}