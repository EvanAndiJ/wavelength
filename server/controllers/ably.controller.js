const roomCon = require('./room.controller');
const gameCon = require('./game.controller');

const { channel } = require('diagnostics_channel');
const { update } = require('../models/user.model');

const Ably = require("ably");
const AblyKey = `qj-X9A.1Mqy4w:7nUaL2KcS4j38URmnTZMwb7t_A71ZbcKgXrbE2pw_Pk`
const realtime = new Ably.Realtime({
  key: AblyKey,
  echoMessages: false,
});

const users = {};
const userChannels = {};
// let gameChannel;
const gameChannels = {}

const host = 'ev'
let teams = {1:[],2:[],all:[]}
let totalUsers = 0;
let started = false
let target = 50;
let range = []
let psych = {1:'', 2:''}
let clue = ''
let guess =  50;
let score = [0,0]
let turn = 1;
let round = 1;
let discard = []
let psychUsed = [[],[]]

module.exports = function(app) {

  app.get("/auth", (req, res) => {
      const tokenParams = { 
          clientId: "id-" + totalUsers.toString() + Math.random().toString(36).substring(2, 16) 
      };
      realtime.auth.createTokenRequest(tokenParams, function (err, tokenRequest) {
          if (err) {
              return res.status(500).send("Error requesting token: " + JSON.stringify(err));
          } else {
              res.setHeader("Content-Type", "application/json");
              return  res.send(JSON.stringify(tokenRequest));
          }
      });
  });
  realtime.connection.once("connected", () => {
    console.log('////Realtime Connect/////')
  });
  
  function publishGame () {
    gameChannel.publish('gameState', {
    //   discard,
      guess,
      host, 
      range,
    //   round,
    //   score,
      started,
      target,
    })
  }
  function newGameChannel(roomCode) {
    const newChannel = realtime.channels.get("gameRoom"  +  roomCode);
    gameChannels[roomCode] = newChannel

    newChannel.presence.subscribe("enter", async (user) => {
        const newUserId = user.clientId
        const roomCode = user.data.roomCode
        console.log(`////User Entered///// ${Date.now()}`, newUserId)
        
        const game = await roomCon.getRoom(roomCode)
        if (!game )  {return {err:'invalid room'}}
        // console.log('user entere', game) 

        // if (!game.users.includes(user.data.name)) {
        //   console.log(game.teams[0])
        //   game.users.push(user.data.name)
        //   game.teams[0].push(user.data.name)
        // } 

        // game.totalUsers++
        // console.log('enter', game)
        // await game.save()
        userChannels[newUserId] = realtime.channels.get("userChannel-" + newUserId);
        subscribeToPlayerInput(userChannels[newUserId], newChannel, newUserId);

        if (game.totalUsers > 1 )   {
            newChannel.publish('teams', game.teams)
            newChannel.publish('gameState', game);
        }
    });
    newChannel.presence.subscribe("leave", async (user) => {
      console.log('///user leaving///')
      const leavingUser = user.clientId;

      const game = await roomCon.userLeaving(leavingUser)
      if (leavingUser in userChannels) {
        userChannels[leavingUser].unsubscribe()
        delete userChannels[leavingUser]
      }
      newChannel.publish('gameState', game);
    });
    newChannel.subscribe('target', (update) =>  { 
        target = Math.floor(Math.random() * 100);
        // publishGame()
    });
    newChannel.subscribe('resub', (update) => {
      consol.log(update.data)
        const id = update.data.id.substring(12)
        const room = update.data.roomCode
        userChannels[id] = realtime.channels.get(update.data)
        subscribeToPlayerInput(userChannels[id], gameChannels[room], id);
    });
  }
  function subscribeToPlayerInput(userChannel, gameChannel, userId) {
    // console.log('subPlayerInput')
    userChannel.subscribe('start', (update) =>  { 
        gameCon.startGame(update.data)
        .then(res => {
          if (res.err) {
            userChannel.publish('err', res.err)
          } else {
            if (res.psychs.check) {
              if (res.psychs[1]) {
                const id = res.psychs[1].ably
                userChannels[id].publish('updateUser', res.psychs[1])
              }
              if (res.psychs[2]) {
                const id = res.psychs[2].ably
                userChannels[id].publish('updateUser', res.psychs[2])
              }
            }
            // gameChannels[update.data].publish('gameStart', res.game);
            gameChannel.publish('gameStart', res.game);
          }
        })
          
    });
    userChannel.subscribe('stop', (update) =>  { 
      gameCon.endGame(update.data)
      .then(res => {
          gameChannel.publish('gameStop', res.game);
        })
    });
    userChannel.subscribe('changeTeams', (update) =>  { 
      roomCon.joinTeam(update.data)
      .then(res => {
        // teams = res.teams; 
        // gameChannel.publish('teams', res.teams);
        gameChannel.publish('gameState', res.game);
        // gameChannel.publish('psychs', res.psychs)
      })   
    })
    userChannel.subscribe('drawRanges', (update) =>  { 
      gameChannel.publish('closeScreen', {});
        gameCon.drawRanges(update.data)
        .then(res => {
          userChannel.publish('drawnRanges', res.ranges);
        })
    });
    userChannel.subscribe('chooseRange', (update) =>  { 
        gameCon.chooseRange(update.data)
        .then(res => {
            gameChannel.publish('drawComplete', res.game);
            userChannel.publish('drawnRanges', 'done')
        })
    });
    userChannel.subscribe('guess', (update) =>  { 
        gameCon.updateGuess(update.data)
        .then(res => {
            gameChannel.publish('gameState', res.game);
        })
    });
    userChannel.subscribe('submitGuess', (update) =>  { 
        gameCon.submitGuess(update.data)
        .then(res => {
          if (res.err) {
            gameChannel.publish('err', res.err)
          } else {
            gameChannel.publish('gameState', res.game);
          }
        })
    });
    userChannel.subscribe('target', (update) => {
        gameCon.getTarget(update.data)
        .then(res => {
            target = res.game.target
            gameChannel.publish('gameState', res.game);
        })
    })
    userChannel.subscribe('screenTog', (update) => {
        gameCon.toggleScreen(update.data)
        .then(res => {
            gameChannel.publish('gameState', res.game);
        })
    })
    userChannel.subscribe('setClue', (update) => {
        gameCon.setClue(update.data)
        .then(res => {
            gameChannel.publish('gameState', res.game);
        })
    })
    userChannel.subscribe('overUnder', (update)=> {
      gameCon.overUnder(update.data)
      .then(res => {
        gameChannel.publish('gameState', res.game);
      })
    })
    userChannel.subscribe('submitSecondGuess', (update)=> {
      gameCon.submitSecondGuess(update.data)
      .then(res => {
        gameChannel.publish('nextTurn', res.game);
      })
    })
    userChannel.subscribe('nextTurn', (update) => {
        gameCon.nextTurn(update.data)
        .then(res => {
            gameChannel.publish('gameState', res.game)
        })
    })
    userChannel.subscribe('unsub', (update)=> {
        Object.keys(userChannels).forEach(key => userChannels[key].unsubscribe() )
    })
    userChannel.subscribe('showMe', (update)=> {
        console.log(Object.keys(userChannels))
        console.log(Object.keys(gameChannels))
        // console.log(teams)
        // console.log(guess,
        //     host, 
        //     range,
        //     started,
        //     target)
    })
    userChannel.subscribe('gcClean', (update) => {
        const roomCode = update.data
        Object.keys(gameChannels).forEach(key =>  {
            if (key !== roomCode) {
                gameChannels[key].unsubscribe()
                delete gameChannels[key]
            }
        })
    })
  }
  function finishGame(playerId) {
    started = false 
    gameRoom.publish("game-over", {
      winner: winnerName,
      firstRunnerUp: firstRunnerUpName,
      secondRunnerUp: secondRunnerUpName,
      totalUsers: totalUsers,
    });
  
    resetServerState();
  }
  function resetServerState() {
    // THIS obviously won't work with mutlitple game channels/games
    // BUT i'm not sure I'll need it
    started = false;
    totalUsers = 0;
    teams = {1:[],2:[],all:[]}
    psych = {1:'', 2:''}
    for (let item in userChannels) {
       userChannels[item].unsubscribe();
    }
  }
  
  app.post('/api/reconnect', async (req, res) => {
    const roomCode = req.body.roomCode
    const room = await roomCon.getRoom(roomCode)
    if (!room )  {return res.status(404).send({err:'invalid room'})}
  });
  app.get("/admin/userChannels", (req, res) => {
    return res.status(200).send({userChannels: Object.keys(userChannels)});
  });
  
  app.post("/admin/addUserChannel", (req, res) => {
    const id = req.body.id
    // userChannels[id].unsubscribe()
    // delete userChannels[id]
    return res.status(200).send({userChannels: Object.keys(userChannels)});
  });
  app.post("/admin/removeUserChannel", (req, res) => {
    const id = req.body.id
    userChannels[id].unsubscribe()
    delete userChannels[id]
    return res.status(200).send({userChannels: Object.keys(userChannels)});
  });
  app.get("/admin/gameChannels", (req, res) => {
    return res.status(200).send({gameChannels: Object.keys(gameChannels)});
  });
  app.post('/api/newGameChannel', (req, res) => {
    console.log('newGameChannel')
    const roomCode = req.body.roomCode
    newGameChannel(roomCode)
  })
  // app.post("/admin/addGameChannel", (req, res) => {
  //   const roomCode = req.body.roomCode
  //   // gameChannels[roomCode].unsubscribe()
  //   // delete gameChannels[roomCode]
  //   return res.status(200).send({gameChannels: Object.keys(gameChannels)});
  // });
  app.post("/admin/removeGameChannel", (req, res) => {
    const roomCode = req.body.roomCode
    gameChannels[roomCode].unsubscribe()
    delete gameChannels[roomCode]
    return res.status(200).send({gameChannels: Object.keys(gameChannels)});
  });
};
