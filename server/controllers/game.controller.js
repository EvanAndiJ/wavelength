const db = require("../models");
const Op = db.Sequelize.Op;
// const config = require("../config/auth.config");
const Room = db.room
const User = db.user;

exports.newRoom = (req, res) => {
  const makeRoomCode = () => {
    const abc = 'abcdefghijklmnopqrstuvwxyz'
    let roomCode = ''
    for (let i=0; i<4; i++) {
      roomCode += abc[Math.floor(Math.random() * abc.length)] 
    }
    return roomCode.toUpperCase()
  }
  const makeRoom = () => {
    const roomCode = makeRoomCode()
    Room.findOne({ where: { code: roomCode }})
    .then(isInDB => { if (isInDB) {
        makeRoom()
      } else {
        Room.create({code: roomCode})
        User.create({name: req.body.name, roomId: roomCode})
        return res.status(200).send({ roomCode: roomCode })
      }
    })
  };
  makeRoom();
};
exports.joinRoom = (req, res) => {
  const roomCode = req.body.roomCode.toUpperCase()
  Room.findOne({ where: { code: roomCode }})
  .then(isInDB => { if (isInDB) {
    User.create({name: req.body.name, roomId: roomCode})
    return res.status(200).send({ roomCode: roomCode })
  } else {
    return res.status(401).send({ noRoom: true})
  }
  })
}
exports.closeRoom = (req, res) => {
  Room.findOne({ where: { code: req.body.roomCode } })
  .then(room => { 
    if (room) {
      Room.destroy({ where: { code: req.body.roomCode} })
      return res.status(200).send({message:'room closed'})
    } else {
      return res.status(401).send({ message: `That room doesn't exist?` })
    }
  })

};
exports.roomUsers = (req, res) => {
  User.findAll({where: {roomId: req.body.roomCode } })
  .then(users => res.status(200).send({users}))
}