const Mongoose = require('mongoose')
const mongoose =  Mongoose.connect( process.env.MONGO_URI)

const db = {};
db.Mongoose = Mongoose
db.mongoose = mongoose

db.user = require('./user.model.js')
db.game = require('./game.model.js')

module.exports = db;