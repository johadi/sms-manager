'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    body: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
  };
  return Message;
};