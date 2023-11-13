const db = require("../models");
const Room = db.room
const Game = db.game
const User = db.user
const deck = require('../assets/ranges')

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
      res.send(JSON.stringify(tokenRequest));
    }
  });
}

exports.startGame = async (roomCode) => {
  const game = await Game.findOne({ code: roomCode })
  if (!game) { return { err:'Room Not Found' } }

  if (game.users.length < 4) {
    return {err: "Need More Players"}
  } else 
  if (game.teams[0].length) {
    return {err: `Some players don't have a team`}
  } else {
    console.log('gamestart')
    game.playing = true;
    game.round = 1;
    game.screen = true;
    game.range = []
    game.discard = []
    game.score = [0,0]

    const newPsychs = {check: false, 1: null, 2: null};
    if (!game.psych[0]) {
      const i = Math.floor(Math.random()*game.teams[1].length)
      const newPsych = game.teams[1][i]
      const user = await User.findOne({room: roomCode, name: newPsych})
      if (user) {
        user.psych = true 
        await user.save()
        newPsychs[1] = user
        newPsychs.check = true
        game.psych[0] = newPsych
      }
    };
    if (!game.psych[1]) {
      let i = Math.floor(Math.random()*game.teams[2].length)
      let newPsych = game.teams[2][i]
      const user = await User.findOne({room: roomCode, name: newPsych})
      if (user) {
        user.psych = true
        await user.save()
        newPsychs[2] = user
        newPsychs.check = true
        game.psych[1] = newPsych
      }
    };
    try {
      await game.save();
      return { game, psychs: newPsychs}
    } catch (err) {
      console.log(err)
      return
    }
  }
}
exports.endGame = async (roomCode) => {
  const game = await Game.findOne({ code: roomCode })
  if (!game) { return { err:'Room Not Found' } }
  game.playing = false
  game.round = 0
  game.screen = false
  try {
    await game.save();
    return { game}
  } catch (err) {
    console.log(err)
  }
}
exports.nextTurn = async (roomCode) => {
  const game = await Game.findOne({ code: roomCode })
  if (!game) { return { err:'Room Not Found' } }
  game.turn++
  game.save()
  return {game}


}

exports.getTarget = async (roomCode) => {

  const game = await Game.findOne({ code: roomCode })
  if (!game) { return { err:'Room Not Found' } }
  game.target = Math.floor(Math.random() * 100);
  game.save()
  return { game } 
}
exports.toggleScreen = async (roomCode) => {

  const game = await Game.findOne({ code: roomCode })
  if (!game) { return { err:'Room Not Found' } }
  const currentPos = game.screen
  game.screen = !currentPos
  try {
    game.save()
    return { game }
  } catch (err) {
    return
  }

}

exports.drawRanges = async (roomCode) => {
  const game = await Game.findOne({ code: roomCode })
  if (!game) { return { err:'Room Not Found' } }

  const drawn = []
  const getRange = () => {
    let range;
    let i = Math.floor(Math.random() * deck.ranges.length)
    let selected = [deck.ranges[i], i]
    if (game.discard.includes(i) || drawn.includes(i)) {
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
  const game = await Game.findOne({ code: roomCode })
  if (!game) { return { err:'Room Not Found' } }

  const oldRange = game.range
  if ( oldRange.length ) {
    game.discard.push(Number(oldRange[1][0]));
  }
  game.range = range;
  game.target = Math.floor(Math.random() * 100);
  game.secondGuess = 1;
  game.clue = '';
  try {
    await game.save();
    return { game };
  } catch (err) {
    return
  }

}
exports.setClue = async ({roomCode, clue}) => {
  const game = await Game.findOne({ code: roomCode })
  if (!game) { return { err:'Room Not Found' } }
  game.clue = clue
  game.phase = 2
  try {
    await game.save()
    return { game }
  } catch (err) {
    return {err: 'already submitted'}
  }
}
exports.updateGuess = async ({roomCode, guess}) => {
  const game = await Game.findOne({ code: roomCode })
  if (!game) { return { err:'Room Not Found' } }
  game.guess = guess
  try {
    game.save()
    return { game }
  } catch (err) {
    return updateGuess({roomCode, guess})
  }
}
exports.submitGuess = async ({roomCode, guess}) => {
  const game = await Game.findOne({ code: roomCode })
  if (!game) { return { err:'Room Not Found' } }
  game.guess = guess
  game.phase = 3
  try {
    game.save()
    return { game }
  } catch (err) {
    return { err: 'Guess Already Submitted' }
  }
}
exports.overUnder = async ({roomCode, side}) => {
  const game = await Game.findOne({ code: roomCode })
  if (!game) { return { err:'Room Not Found' } }

  if (side === 'l') {
    game.secondGuess = game.secondGuess === 0 ? 1 : 0
  } else 
  if (side=== 'r') {
    game.secondGuess = game.secondGuess === 2 ? 1 : 2
  }
  try {
    game.save()
    return { game }
  } catch (err) {
    return overUnder({roomCode, side})
  }
}
exports.submitSecondGuess = async ({roomCode}) => {
  const game = await Game.findOne({ code: roomCode })
  if (!game) { return { err:'Room Not Found' } }
  
  let score = 0;
  const guess = game.guess
  const second = game.secondGuess
  if (guess <= game.target+2 && guess >= game.target-2) {
    score = 4;
  } else if (guess <= game.target+7 && guess >= game.target-7) {
    score = 3;
  } else if (guess <= game.target+12 && guess >= game.target-12) {
    score = 2;
  } else {
    score = 0;
  }
  game.score[game.turn-1] += score
  if (second < 1 && game.target < guess) {
    game.score[game.turn === 1 ? 1 : 0] += 1
  } else 
  if (second > 1 && game.target > guess) {
    game.score[game.turn === 1 ? 1 : 0] += 1
  
  }

  if (game.turn === 2) { game.round++ }
  game.turn = game.turn === 1 ? 2 : 1;
  game.phase = 1
  try {
    game.save()
    return {game}
  } catch (err) {
    return {err: "already submitted"}
  }
}