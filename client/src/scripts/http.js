export async function NewRoom (name) {
    return fetch('/api/nsewRoom', {
        method: 'POST',
        headers: {
          'content-type':'application/json',
        },
        body: JSON.stringify({name})
      })
    .then(res => res.json())
}
export async function getUserChannels () {
    return fetch('/admin/userChannels', {
        method: 'GET',
        headers: {
          'content-type':'application/json',
        },
      })
    .then(res => res.json())
    // .then(res => res)
}
export async function newUserChannel (id) {
  return fetch('/api/newGameChannel', {
      method: 'POST',
      headers: {
        'content-type':'application/json',
      },
      body: JSON.stringify({id})
    })
  .then(res => res.json())
}
export async function removeUserChannel (id) {
  return fetch('/admin/removeGameChannel', {
      method: 'POST',
      headers: {
        'content-type':'application/json',
      },
      body: JSON.stringify({id})
    })
  .then(res => res.json())
}
export async function getGameChannels () {
    return fetch('/admin/gameChannels', {
        method: 'GET',
        headers: {
          'content-type':'application/json',
        },
      })
    .then(res => res.json())
}
export async function removeGameChannel (roomCode) {
    return fetch('/admin/removeGameChannel', {
        method: 'POST',
        headers: {
          'content-type':'application/json',
        },
        body: JSON.stringify({roomCode})
      })
    .then(res => res.json())
}
export async function newGameChannel (roomCode) {
  return fetch('/api/newGameChannel', {
      method: 'POST',
      headers: {
        'content-type':'application/json',
      },
      body: JSON.stringify({roomCode})
    })
  .then(res => res.json())
}
async function reconnect (roomCode) {
  return fetch('/api/reconnect', {
      method: 'POST',
      headers: {
        'content-type':'application/json',
      },
      body: JSON.stringify({roomCode})
    })
  .then(res => res.json())
}
async function joinRoom(name, roomCode, userId=null) {
  return fetch('/api/joinRoom', {
      method: 'POST',
      headers: {
        'content-type':'application/json',
      },
      body: JSON.stringify({name, roomCode, userId})
    })
  .then(res => res.json())
}
async function joinTeam(user, team, psych) {
  return fetch('/api/joinTeam', {
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
  return fetch('/api/roomUsers', {
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
  return fetch('/api/startGame', {
    method: 'POST',
    headers: {
      'content-type':'application/json',
    },
    body: JSON.stringify({ room: roomCode})
  })
  .then(res => res.json())
}
async function endGame(roomCode) {
  return fetch('/api/endGame', {
    method: 'POST',
    headers: {
      'content-type':'application/json',
    },
    body: JSON.stringify({ room: roomCode})
  })
  .then(res => res.json())
}
async function getTarget(room) {
  return fetch('/api/getTarget', {
    method: 'POST',
    headers: {
      'content-type':'application/json',
    },
    body: JSON.stringify({ room })
  })
  .then(res => res.json())
}
async function drawRanges(room) {
  return fetch('/api/drawRanges', {
    method: 'POST',
    headers: {
      'content-type':'application/json',
    },
    body: JSON.stringify({ room })
  })
  .then(res => res.json())
}
async function chooseRange(room, range) {
  return fetch('/api/chooseRange', {
    method: 'POST',
    headers: {
      'content-type':'application/json',
    },
    body: JSON.stringify({ room, range })
  })
  .then(res => res.json())
}
async function addClientId(roomCode, _id, clientId) {
  return fetch('/api/addClientId', {
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