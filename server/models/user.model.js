module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      name: {
        type: Sequelize.STRING
      },
      roomId: {
        type: Sequelize.STRING,
      }
    });
    return User;
  };