import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";

export default function Room() {
    var nav = useNavigate()
    const { roomCode } = useParams()
    const [users, setUsers] = useState([])

    useEffect(()=>{
        console.log('effect')
        fetch('/api/roomUsers', {
            method: 'POST',
            headers: {
              'content-type':'application/json',
            },
            body: JSON.stringify({roomCode})
          })
        .then(res => res.json())
        .then(res => {
            setUsers(res.users)
            // nav(`/room/${res.roomCode}`)
        })
    },[])

    const endGame = () => {
        fetch('/api/closeRoom', {
            method: 'POST',
            headers: {
                'content-type':'application/json',
            },
            body: JSON.stringify({roomCode: roomCode})
        })
        .then(res => { if (res.ok) {
                nav(`/`)
        }})
    }

    return (
        <div>
            Game Room {roomCode}
            
            <button onClick={()=>console.log(users)}>print</button>
            
            {/* {users.map(user => <p>{user?.name}</p>)} */}
            
            <button onClick={endGame}>Quit</button>
            <button onClick={()=>console.log(roomCode)}>room</button>
        </div>
    )
}