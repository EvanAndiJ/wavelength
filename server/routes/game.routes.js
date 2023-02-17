const controller = require("../controllers/game.controller");
module.exports = function(app) {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/newRoom",
    controller.newRoom
  );
  app.post("/api/joinRoom",
    controller.joinRoom
  );
  app.post("/api/closeRoom",
    controller.closeRoom
  );
  app.post('/api/roomUsers',
    controller.roomUsers
  );
  
};