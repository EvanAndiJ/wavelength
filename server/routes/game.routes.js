const controller = require("../controllers/game.controller");
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

  
};