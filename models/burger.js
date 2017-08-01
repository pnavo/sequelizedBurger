'use strict';
module.exports = function(sequelize, DataTypes) {
  var burger = sequelize.define('burger', {
    burger_name: DataTypes.STRING,
    devoured: DataTypes.BOOLEAN,
    devourerId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        burger.hasOne(models.devourers)
      }
    }
  });
  return burger;
};