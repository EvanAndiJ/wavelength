const { Schema, model } = require('mongoose');


const gameSchema = new Schema({
  host: String,
  code: { //unique room id 
    type: String,
    required: true
  },
  totalUsers: {
    type: Number,
    default: 0
  },
  users: { //All users
    type: [String],
    defautl: []
  },
  teams: { //users by team 0:none, 1:t1, 2:t2
    type: [[String],[String],[String]],
    defautl: [[],[],[]]
  },
  playing: { // play status. has the actual game been started 
    type: Boolean,
    default: false
  },
  score: { //current store
    type: [Number, Number],
    default: [0,0],
  },
  turn: { //current teams turn
    type: Number,
    default: 1,
  },
  phase: {
    type: Number,
    default: 1,
  },
  round: { //current game round, might change to stage? turn? 
    type: Number,
    default: 1,
  },
  target: { //the current target position.
    type: Number, 
    default: 50,
  },
  screen: {
    type: Boolean,
    default: false,
  },
  range: [ [String, String], Number], //the current range and it's index in master list 
  discard: {
    type: [Number],
    default: []
  },  //index numbers of ranges that have already been chosen
  psych: { //the current psych from each team
    type: [String, String], 
    default: ['',''],
    
  }, 
  psychUsed: [[String],[String]], //List of users that have been psych already (ONLY NEED IF DOING RANDOM??)
  guess: { //the current guess position
    type: Number, 
    default: 50,
  },
  secondGuess: { //the current guess position
    type: Number, 
    default: 1,
  },
  clue: {
    type: String,
    default: ''
  },
  // },
  dateCreated: {
    type: Date,
    default: () => Date.now(),
    immutable: true
  },
  dateUpdated: Date
})

gameSchema.pre('save', function(next){
  this.dateUpdated = Date.now();
  next();
})
//
module.exports = model('Game', gameSchema)