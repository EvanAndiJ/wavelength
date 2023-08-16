const adminCon = require("../controllers/admin.controller");
const ablyCon = require("../controllers/ably.controller")

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

  
};