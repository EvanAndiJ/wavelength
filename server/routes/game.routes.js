const controller = require("../controllers/game.controller");
const ablyCon = require("../controllers/ably.controller");

module.exports = function(app, realtime) {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/startGame",
    controller.startGame
  );
  app.post("/api/endGame",
    controller.endGame
  );
  app.post("/api/getTarget",
    controller.getTarget
  );
  app.post("/api/drawRanges",
    controller.drawRanges
  );
  app.post('/api/chooseRange',
    controller.chooseRange
  );
  app.get("/authUser", 
    controller.authUser
  );

  app.get("/auth", 
    ablyCon.ablyAuth
  );
  app.post('/api/reconnect',
    ablyCon.reconnect 
  );
  app.get("/admin/userChannels", 
    ablyCon.userChannels
  );

  app.post("/admin/addUserChannel",
    ablyCon.addUserChannel
  );
  app.post("/admin/removeUserChannel",
    ablyCon.removeUserChannel
  );
  app.get("/admin/gameChannels",
    ablyCon.gameChannels
  );
  app.post('/api/newGameChannel',
    ablyCon.newGameChannelReq
  );
  app.post("/admin/removeGameChannel", 
    ablyCon.removeGameChannel
  );
};