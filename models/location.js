'use strict';
module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define('location', {
    address: { 
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    lat: DataTypes.FLOAT,
    long: DataTypes.FLOAT
  }, {});
  location.associate = function(models) {
    // associations can be defined here
    models.busker.belongsToMany(models.location, { through: 'buskerLocation'})

  };
  return location;
};