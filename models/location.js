'use strict';
module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define('location', {
    lat: DataTypes.FLOAT,
    long: DataTypes.FLOAT,
    city: DataTypes.STRING,
    state: DataTypes.STRING
  }, {});
  location.associate = function(models) {
    // associations can be defined here
    models.location.belongsToMany(models.busker, { through: 'buskerLocation' })
  };
  return location;
};