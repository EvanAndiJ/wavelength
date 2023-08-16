const db = require("../models");
const Room = db.room
const User = db.user
const deck = require('../assets/ranges')
const Ably = require("ably");

exports.startGameReq = async (req, res) => {
  const room = await Room.findOne({ code: req.body.room })
  if (room) {
    if ([...room.users.all, ...room.users[1], ...room.users[2]].length < 4) {
      return res.status(400).send({err: "Need More Players"})
    } else {
      room.game.started = true
      room.game.round = 1
      room.save()
      return res.status(200).send({game: room.game})
    }
  } else {
    return res.status(400).send({err: "Invalid Room Code (somehow)"})
  }
}
exports.endGameReq = async (req, res) => {
  const room = await Room.findOne({ code: req.body.room })
  if (room) {
    room.game.started = false
    room.game.round = 0
    room.save()
    return res.status(200).send({game: room.game})
  } else {
    return res.status(400).send({err: "Invalid Room Code (somehow)"})
  }
}
exports.getTargetReq = async (req, res) => {
  const room = await Room.findOne({code: req.body.room})
  if (room) {
    room.game.target = Math.floor(Math.random() * 100);
    room.save()
    return res.status(200).send({ game: room.game })

  }
}
exports.drawRangesReq = async (req, res) => {
  const room = await Room.findOne({code: req.body.room})
  if (!room )  {return res.status(400).send({err:'invalid room'})}
  // console.log('starting draw')
  const drawn = []
  const getRange = () => {
    let range;
    let i = Math.floor(Math.random() * deck.ranges.length)
    let q = [deck.ranges[i], i]
    if (room.game.discard.includes(i) || drawn.includes(i)) {
      range = getRange() 
    } else {
      range = q
      drawn.push(i)
    }
    return range
  }
  let pool = []
  while (pool.length < 3) {
    const r = getRange()
    pool.push(r)
  }
  return res.status(200).send({ ranges: pool })
  // if (game.round == 1 || game.round == 6) {
    //   let pot = cards.filter(card => !game.discard.includes(card));
    //   for (var i = 1; i < 4; i++) { 
    //     if (game.discard.length > 250) {
    //       game.discard = [];
    //     };
    //     n = Math.floor(Math.random() * pot.length);
    //     game.draw.push(pot.splice(n,1)[0])
    //     let left = document.getElementById('opt'+ (i-1) + 'L');
    //     let right = document.getElementById('opt'+ (i-1) + 'R');
    //     left.innerHTML = game.draw[i-1][0].toUpperCase();
    //     right.innerHTML = game.draw[i-1][1].toUpperCase();
    //   }
    //   document.getElementById('modalBG').style.display = 'block';
    //   document.getElementById('modalTots').style.display = 'flex';
    // }
    
}
exports.chooseRangeReq = async (req, res) => {
  const range = req.body.range
  const room = await Room.findOne({ code: req.body.room })
  const oldRange = room.game.range
  if ( oldRange.length ) {
    room.game.discard.push(Number(oldRange[1][0]))
  }
  room.game.range = range
  await room.save()
  return res.status(200).send({game: room.game})
}
exports.authUser = async (req, res) => {
  const uniqueId = function () {
    return "id-" + totalPlayers + Math.random().toString(36).substring(2, 16);
  };
  const tokenParams = { clientId: uniqueId() };
  realtime.auth.createTokenRequest(tokenParams, function (err, tokenRequest) {
    if (err) {
      res.status(500).send("Error requesting token: " + JSON.stringify(err));
    } else {
      // res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(tokenRequest));
    }
  });
}

exports.startGame = async (roomCode) => {
  const room = await Room.findOne({code: roomCode})
  if ( !room )  { return { err:'Room Not Found' } }

  // if (totalPlayers < 4) {
  //   return {err: "Need More Players"}
  // } else 
  // if (room.users.all.length) {
  //   return {err: 'Some players don't have a team'}
  // } else {
    // console.log('gamestart')

    room.game.started = true;
    room.game.round = 1;
    room.game.screen = true;
    const newPsychs = {check: false, 1: null, 2: null};

    if (!room.game.psych[1]) {
      const i = Math.floor(Math.random()*room.users[1].length)
      const newPsych = room.users[1].splice(i, 1)[0]
      const user = await User.findOne({room: roomCode, name: newPsych})
      if (user) {
        user.psych = true 
        await user.save()
        newPsychs[1] = user
        newPsychs.check = true
        room.game.psych[1] = newPsych
      }
    };
    if (!room.game.psych[2]) {
      let i = Math.floor(Math.random()*room.users[2].length)
      let newPsych = room.users[2].splice(i, 1)[0]
      const user = await User.findOne({room: roomCode, name: newPsych})
      if (user) {
        user.psych = true
        await user.save()
        newPsychs[2] = user
        newPsychs.check = true
        room.game.psych[2] = newPsych
      }
    };
    await room.save();
    return { game: room.game, psychs: newPsychs}
  // }
}
exports.endGame = async (roomCode) => {
  const room = await Room.findOne({code: roomCode})
  if ( !room )  { return { err:'Room Not Found' } }

  room.game.started = false
  room.game.round = 0
  room.game.screen = false
  room.save()
  return { game: room.game }
}
exports.nextTurn = async (roomCode) => {
  const room = await Room.findOne({code: roomCode})
  if ( !room )  { return { err:'Room Not Found' } }

  room.game.turn++
  room.save()
  return {game: room.game}
}
exports.getTarget = async (roomCode) => {
  const room = await Room.findOne({code: roomCode})
  if ( !room )  { return { err:'Room Not Found' } }

  room.game.target = Math.floor(Math.random() * 100);
  room.save()
  return { game: room.game } 
}
exports.toggleScreen = async (roomCode) => {
  const room = await Room.findOne({code: roomCode})
  if ( !room )  { return { err:'Room Not Found' } }

  const currentPos = room.game.screen
  room.game.screen = !currentPos
  room.save()
  return { game: room.game }
}
exports.drawRanges = async (roomCode) => {
  const room = await Room.findOne({ code: roomCode })
  if ( !room )  { return { err:'Room Not Found' } }
  
  const drawn = []
  const getRange = () => {
    let range;
    let i = Math.floor(Math.random() * deck.ranges.length)
    let selected = [deck.ranges[i], i]
    if (room.game.discard.includes(i) || drawn.includes(i)) {
      range = getRange() 
    } else {
      range = selected
      drawn.push(i)
    }
    return range
  }
  let pool = []
  while (pool.length < 3) {
    const r = getRange()
    pool.push(r)
  }
  return { ranges: pool }
}
exports.chooseRange = async ({roomCode, range}) => {
  const room = await Room.findOne({ code: roomCode })
  if (!room) { return { err: 'Room Not Found' } }

  const oldRange = room.game.range
  if ( oldRange.length ) {
    room.game.discard.push(Number(oldRange[1][0]))
  }
  room.game.range = range
  await room.save()
  return { game: room.game }

}
exports.setClue = async ({roomCode, clue}) => {
  const room = await Room.findOne({ code: roomCode })
  if (!room) { return { err: 'Room Not Found' } }

  room.game.clue = clue
  await room.save()

  return { game: room.game }
}
exports.updateGuess = async ({roomCode, guess}) => {
  const room = await Room.findOne({ code: roomCode })
  if (!room) { return { err: 'Room Not Found' } }

  room.game.guess = guess
  room.save()

  return { game: room.game }

}