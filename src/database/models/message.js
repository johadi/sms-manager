'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      notEmpty: {
        args: true,
        msg: 'Message body can not be empty'
      }
    },
    status: {
      type: DataTypes.ENUM('sent', 'read'),
      defaultValue: 'sent',
    },
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.Contact, {foreignKey: 'senderId', as: 'sender', onDelete: 'cascade'});
    Message.belongsTo(models.Contact, {foreignKey: 'receiverId', as: 'receiver', onDelete: 'cascade'});
  };

  Message.createRules = () => ({
    senderId: 'required',
    receiverId: 'required',
    body: 'required',
  });

  return Message;
};