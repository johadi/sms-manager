'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Messages', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      senderId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      receiverId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      body: {
        type: Sequelize.STRING,
        notEmpty: {
          args: true,
          msg: 'Message body can not be empty'
        }
      },
      status: {
        type: Sequelize.ENUM('sent', 'read'),
        defaultValue: 'sent'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Messages');
  }
};