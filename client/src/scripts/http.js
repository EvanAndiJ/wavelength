const endpoint = process.env.NODE_ENV === 'production' ?
  "https://wavelength-ej23-2dd5b345718d.herokuapp.com"
  : '/'

export async function NewRoom (name) {
  // console.log(endpoint, 'delete me')
    return fetch(`${endpoint}/api/newRoom`, {
        method: 'POST',
        headers: {
          'content-type':'application/json',
        },
        body: JSON.stringify({name})
      })
    .then(res => res.json())
    .catch(err => console.log(err))
}
export async function getUserChannels () {
    return fetch(`${endpoint}/admin/userChannels`, {
        method: 'GET',
        headers: {
          'content-type':'application/json',
        },
      })
    .then(res => res.json())
    // .then(res => res)
}
export async function newUserChannel (id) {
  return fetch(`${endpoint}/api/newGameChannel`, {
      method: 'POST',
      headers: {
        'content-type':'application/json',
      },
      body: JSON.stringify({id})
    })
  .then(res => res.json())
}
export async function removeUserChannel (id) {
  return fetch(`${endpoint}/admin/removeGameChannel`, {
      method: 'POST',
      headers: {
        'content-type':'application/json',
      },
      body: JSON.stringify({id})
    })
  .then(res => res.json())
}
export async function getGameChannels () {
    return fetch(`${endpoint}/admin/gameChannels`, {
        method: 'GET',
        headers: {
          'content-type':'application/json',
        },
      })
    .then(res => res.json())
}
export async function removeGameChannel (roomCode) {
    return fetch(`${endpoint}/admin/removeGameChannel`, {
        method: 'POST',
        headers: {
          'content-type':'application/json',
        },
        body: JSON.stringify({roomCode})
      })
    .then(res => res.json())
}
export async function newGameChannel (roomCode) {
  return fetch(`${endpoint}/api/newGameChannel`, {
      method: 'POST',
      headers: {
        'content-type':'application/json',
      },
      body: JSON.stringify({roomCode})
    })
  .then(res => res.json())
}
async function reconnect (roomCode) {
  return fetch(`${endpoint}/api/reconnect`, {
      method: 'POST',
      headers: {
        'content-type':'application/json',
      },
      body: JSON.stringify({roomCode})
    })
  .then(res => res.json())
}
async function joinRoom(name, roomCode, userId=null) {
  return fetch(`${endpoint}/api/joinRoom`, {
      method: 'POST',
      headers: {
        'content-type':'application/json',
      },
      body: JSON.stringify({name, roomCode, userId})
    })
  .then(res => res.json())
}
async function joinTeam(user, team, psych) {
  return fetch(`${endpoint}/api/joinTeam`, {
    method: 'POST',
    headers: {
      'content-type':'application/json',
    },
    body: JSON.stringify({ user, team, psych})
  })
  .then(res => res.json())
  // .then(res => res.users)
}
async function getUsers(roomCode) {
  return fetch(`${endpoint}/api/roomUsers`, {
    method: 'POST',
    headers: {
      'content-type':'application/json',
    },
    body: JSON.stringify({roomCode})
  })
  .then(res => res.json())
  .then(res => res.users)
}
async function startGame(roomCode) {
  return fetch(`${endpoint}/api/startGame`, {
    method: 'POST',
    headers: {
      'content-type':'application/json',
    },
    body: JSON.stringify({ room: roomCode})
  })
  .then(res => res.json())
}
async function endGame(roomCode) {
  return fetch(`${endpoint}/api/endGame`, {
    method: 'POST',
    headers: {
      'content-type':'application/json',
    },
    body: JSON.stringify({ room: roomCode})
  })
  .then(res => res.json())
}
async function getTarget(room) {
  return fetch(`${endpoint}/api/getTarget`, {
    method: 'POST',
    headers: {
      'content-type':'application/json',
    },
    body: JSON.stringify({ room })
  })
  .then(res => res.json())
}
async function drawRanges(room) {
  return fetch(`${endpoint}/api/drawRanges`, {
    method: 'POST',
    headers: {
      'content-type':'application/json',
    },
    body: JSON.stringify({ room })
  })
  .then(res => res.json())
}
async function chooseRange(room, range) {
  return fetch(`${endpoint}/api/chooseRange`, {
    method: 'POST',
    headers: {
      'content-type':'application/json',
    },
    body: JSON.stringify({ room, range })
  })
  .then(res => res.json())
}
async function addClientId(roomCode, _id, clientId) {
  return fetch(`${endpoint}/api/addClientId`, {
    method: 'POST',
    headers: {
      'content-type':'application/json',
    },
    body: JSON.stringify({ roomCode, _id, clientId })
  })
  .then(res => res.json())
}

const http = {
    newRoom: NewRoom,
    newGameChannel,
    joinRoom,
    getUsers,
    joinTeam,
    startGame,
    endGame,
    getTarget,
    drawRanges,
    chooseRange,
    addClientId
}

export default http;