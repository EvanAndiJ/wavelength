const db = require("../models");
const Room = db.room
const User = db.user
const Game = db.game
const ablyCon = require('./ably.controller')

exports.newRoom = async (req, res) => {
  console.log('newRoom')
  const makeRoomCode = async () => {
    const abc = 'abcdefghijklmnopqrstuvwxyz'
    let roomCode = ''
    for (let i=0; i<4; i++) {
      roomCode += abc[Math.floor(Math.random() * abc.length)] 
    }
    const game = await Game.findOne({code: roomCode})
    if (game) { roomCode = makeRoomCode() } 
    return roomCode.toUpperCase()
  }
  const roomCode = await makeRoomCode()
  const creator = await User.create({name: req.body.name, room: roomCode, team:0})
  const game = await Game.create({
    code: roomCode, 
    users:[creator.name],
    teams:[[creator.name],[],[]],
    host: creator.name,
    totalUsers: 1,
  })
  ablyCon.newGameChannel(roomCode)
  return res.status(200).send({ game, creator })
};
exports.joinRoom = async (req, res) => {
  const roomCode = req.body.roomCode.toUpperCase()
  const userId = req.body.userId
  const name = req.body.name

  
  const game = await Game.findOne({ code: roomCode })
  if (!game) { return res.status(401).send({ err: 'Room Not Found' }) }
  
  let user = !userId ? await User.create({name: name, room: roomCode}) : await User.findById(userId) 
  if (!user) { return res.status(401).send({ err: 'User not found'}) }
 
  if (userId === null && game.users.includes(name)) {
      return res.status(401).send({err: 'Name Taken'}) 
  }
  if (user.room != roomCode) {
    user.room = roomCode
    user.team = 0
    await user.save()
  }
  if (!game.teams[user.team].includes(user.name)) { 
    const newTeam = game.teams[user.team]
    newTeam.push(user.name)
    game.teams.splice(user.team,1,newTeam)
    await game.save()
  }
  if (!game.users.includes(name)) { game.users.push( user.name ) }
  game.totalUsers++
  await game.save()
  return res.status(200).send({ game, user })
}
exports.closeRoom = async (roomCode) => {
  console.log('closeRoom')
  const game = await Game.findOneAndDelete({ code: roomCode })
  console.log('findoneDelete', game)
};

exports.joinTeam = async ({ _id, team, psych})  => {
  const user = await User.findById(_id)
  const roomCode = user.room.toUpperCase()
  const game = await Game.findOne({ code: roomCode })
  const prevTeam = user.team

  if (prevTeam != team) {
    const newTeam = game.teams[team]
    newTeam.push(user.name)
    game.teams[team] = newTeam
    if (prevTeam === 0) {
      game.teams[0] = game.teams[0].filter( 
        u => u !== user.name ) 
    }
    else { 
      if (game.psych[prevTeam-1] === user.name) {
        game.psych[prevTeam-1] = "";
        user.psych = false;
      }
      game.teams[prevTeam] = game.teams[prevTeam].filter( 
        u => u !== user.name )
    }

    user.team = team

  }
  if (psych) {
    game.psych[team-1] = user.name
    user.psych = true
  } else {
    if (game.psych[team-1] === user.name) {
      game.psych[team-1] = "";
      user.psych = false;
    }
  }
  try {
    await user.save()
    await game.save()
    return {teams: game.teams, psychs: game.psych, game}
  } catch (err) {
    // console.log(err)
    return this.joinTeam(({ _id, team, psych}))
    
  }
}
exports.roomUsers = async (req, res) => {
  const roomCode = req.body.roomCode.toUpperCase()

  const game = Game.findOne({ code: roomCode })
  if (!game) { return res.status(401).send({ noRoom: true})}
  return res.status(200).send({ users: game.teams})
}

exports.getRoom = async (roomCode) => {
  const game = await Game.findOne({ code: roomCode }) 
  return game ? game : null
}
exports.userLeaving = async (id) => {
  console.log('userLeaving func')
  const user = await User.findOne({ably: id})
  if (!user) {return {}}

  const game = await Game.findOne({ code: user.room })
  if (!game) { return {}}
  if (game.totalUsers > 0) {game.totalUsers--}
  try {
    await game.save()
    return game
  } catch (err) {
    return this.userLeaving(id)
  }
}
exports.addClientId = async (req, res) => {
  const id = req.body._id
  const user = await User.findById(id)
  user.ably = req.body.clientId
  user.save()
  return res.status(200).send({ok:true, user})
}