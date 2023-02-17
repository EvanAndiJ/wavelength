module.exports = (sequelize, Sequelize) => {
    const Room = sequelize.define("rooms", {
      code: {
        type: Sequelize.STRING,
        unique: true
      }
    });
    return Room;
  };