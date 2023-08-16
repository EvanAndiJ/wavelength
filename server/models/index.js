const Mongoose = require('mongoose')
const mongoose =  Mongoose.connect(
    "mongodb+srv://asleepies:Y5gb4JVCi4K6VXnT@asleepies.xujinrx.mongodb.net/?retryWrites=true&w=majority")

const db = {};
db.Mongoose = Mongoose
db.mongoose = mongoose

db.user = require('./user.model.js')
// db.room = require('./room.model.js')
db.game = require('./game.model.js')

module.exports = db;