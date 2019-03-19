'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name can not be empty'
        }
      }
    },
    phoneNumber: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Phone Number can not be empty'
        }
      }
    }
  }, {});

  Contact.associate = function(models) {
    // associations can be defined here
    Contact.hasMany(models.Message, {foreignKey: 'senderId', as: 'sender', onDelete: 'cascade'});
    Contact.hasMany(models.Message, {foreignKey: 'receiverId', as: 'receiver', onDelete: 'set null'});
  };

  Contact.createRules = () => ({
    name: 'required',
    phoneNumber: 'required',
  });

  return Contact;
};