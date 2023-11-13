const controller = require("../controllers/game.controller");
const ablyCon = require("../controllers/ably.controller");

module.exports = function(app, realtime) {

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

};