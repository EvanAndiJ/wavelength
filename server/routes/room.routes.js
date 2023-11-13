const controller = require("../controllers/room.controller");
const ably = require("../controllers/ably.controller")
module.exports = function(app) {

  app.post("/api/newRoom",
    controller.newRoom
  );
  app.post("/api/joinRoom",
    controller.joinRoom
  );
  app.post("/api/closeRoom",
    controller.closeRoom
  );
  app.post("/api/joinTeam",
    controller.joinTeam
  );
  app.post('/api/roomUsers',
    controller.roomUsers
  );
  app.post('/api/addClientId',
    controller.addClientId
  );
};