const { Schema, model } = require('mongoose');
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  room: String,
  team: {
    type: Number,
    default: 0
  },
  psych: {
    type: Boolean,
    default: false
  },
  screen: {
    type: Boolean,
    default: false,
  },
  ably: {
    type: String,
    default: null
  },
})
module.exports = model('User', userSchema)
