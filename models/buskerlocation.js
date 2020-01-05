'use strict';
module.exports = (sequelize, DataTypes) => {
  const buskerLocation = sequelize.define('buskerLocation', {
    buskerId: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER
  }, {});
  buskerLocation.associate = function(models) {
    // associations can be defined here
  };
  return buskerLocation;
};