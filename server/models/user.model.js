const { Schema, model } = require('mongoose');

// module.exports = () => {
//   const User = model('User', userSchema)
//   return User;
// }
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

// module.exports = (sequelize, Sequelize) => {a
//     const User = sequelize.define("users", {
//       name: {
//         type: Sequelize.STRING
//       },
//       roomId: {
//         type: Sequelize.STRING,
//       }
//     });
//     return User;
//   };