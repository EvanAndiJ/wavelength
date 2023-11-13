const controller = require('../controllers/admin.controller')

module.exports = function(app) {

  app.post("/api/adminLogin",
    controller.adminLogin
  );

  
};