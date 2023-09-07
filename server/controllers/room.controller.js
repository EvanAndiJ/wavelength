const db = require("../models");
const Room = db.room
const User = db.user
const Game = db.game
import { newGameChannel } from "./ably.controller";

exports.newRoom = async (req, res) => {
  console.log('newRoom')
  const makeRoomCode = async () => {
    const abc = 'abcdefghijklmnopqrstuvwxyz'
    let roomCode = ''
    for (let i=0; i<4; i++) {
      roomCode += abc[Math.floor(Math.random() * abc.length)] 
    }
    // const room = await Room.findOne({code: roomCode})
    // if (room) { roomCode = makeRoomCode() } 
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
  newGameChannel(roomCode)
  return res.status(200).send({ game, creator })
};
exports.joinRoom = async (req, res) => {
  const roomCode = req.body.roomCode.toUpperCase()
  const userId = req.body.userId
  const name = req.body.name

  // console.log('join room', roomCode, userId, name)
  
  const game = await Game.findOne({ code: roomCode })
  if (!game) { return res.status(401).send({ err: 'Room Not Found' }) }
  // console.log('jr game', game)
  
  let user = !userId ? await User.create({name: name, room: roomCode}) : await User.findById(userId) 
  if (!user) { return res.status(401).send({ err: 'User not found'}) }
  // console.log('jr user', user)
 
  if (userId === null && game.users.includes(name)) {
      return res.status(401).send({err: 'Name Taken'}) 
  }
  if (user.room != roomCode) {
    user.room = roomCode
    user.team = 0
    await user.save()
  }
  if (!game.teams[user.team].includes(user.name)) { 
    // console.log('fucking please', game.teams[user.team]); 
    const newTeam = game.teams[user.team]
    newTeam.push(user.name)
    game.teams.splice(user.team,1,newTeam)
    await game.save()
    // console.log('fucking why', game.teams[user.team]); 
  }
  if (!game.users.includes(name)) { game.users.push( user.name ) }
  game.totalUsers++
  await game.save()
  // console.log('post save', game)
  return res.status(200).send({ game, user })
}
exports.closeRoom = async (req, res) => {
  // const room = await Room.findOne({ code: req.body.roomCode })
  // if (!room) { return res.status(401).send({ message: `That room doesn't exist?` }) }
  const game = await Game.findOne({ code: req.body.roomCode })
  if (!game) { return res.status(401).send({ message: `That room doesn't exist?` }) }
  // if (room) {
  // await Room.deleteOne({ code: req.body.roomCode })
  await Game.deleteOne({ code: req.body.roomCode })
  return res.status(200).send({message:'room closed'})
  // } else {
  //   return res.status(401).send({ message: `That room doesn't exist?` })
  // }

};
exports.joinTeamOld = async (req, res)  => {
  const user = await User.findById(req.body.user)
  const roomCode = user.room.toUpperCase()
  // const room = await Room.findOne({ code: roomCode })
  const game = await Game.findOne({ code: roomCode })
  const prevTeam = user.team
  const team = req.body.team
  if (prevTeam != team) {
    // room.users[team].push(user.name)
    game.teams[team].push(user.name)
    if (prevTeam === 0) {
      // room.users.all = room.users.all.filter( 
      //   u => u !== user.name ) 
    }
    else { 
      // room.users[prevTeam] = await room.users[prevTeam].filter( 
      //   u => u !== user.name )
    }
    user.team = team
  }
  if (req.body.psych) {
    // room.game.psych[team] = user.name
    user.psych = true
  }
  await user.save()
  // await room.save()

  return res.status(200).send({teams: room.users})
}

exports.joinTeam = async ({ _id, team, psych})  => {
  // console.log('joining')
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
      //if user was the psych on old team
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
  // } else {
  //   return res.status(401).send({ noRoom: true})
  // }
  // })
  // User.findAll({where: {roomId: req.body.roomCode } })
  // .then(users => res.status(200).send({users}))
}

exports.getRoom = async (roomCode) => {
  const game = await Game.findOne({ code: roomCode }) 
  return game ? game : null
}
exports.userLeaving = async (id) => {
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
// = async (roomCode, useId, clientId) => {
  const id = req.body._id
  const user = await User.findById(id)
  user.ably = req.body.clientId
  user.save()
  return res.status(200).send({ok:true, user})
}