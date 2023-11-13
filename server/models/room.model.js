const { Schema, model } = require('mongoose');


const roomSchema = new Schema({
  code: { //unique room id 
    type: String,
    required: true
  },
  totalUsers: {
    type: Number,
    default: 0
  },
  users:{ // users and their teams in the room
    all: [String],
    1:{
      type: [String],
      default: []
    },
    2:{
      type: [String],
      default: []
    }
  },
  creator: String, // the creator of the room
  game: {
    host: String,
    started: { // play status. has the actual game been started 
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
    discard: [Number],  //index numbers of ranges that have already been chosen
    psych: { //the current psych from each team
      1:{ 
        type: String, 
        default: '',
      },
      2:{ 
        type: String, 
        default: '',
      },
    }, 
    psychUsed: [[String],[String]], //List of users that have been psych already (ONLY NEED IF DOING RANDOM??)
    guess: { //the current guess position
      type: Number, 
      default: 50,
    },
    clue: {
      type: String,
      default: ''
    },
  },
  created: {
    type: Date,
    default: () => Date.now(),
    immutable: true
  },
  updated: Date
})

roomSchema.pre('save', function(next){
  this.updated = Date.now();
  next();
})

module.exports = model('Room', roomSchema)