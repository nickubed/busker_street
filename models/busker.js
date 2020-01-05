'use strict';
module.exports = (sequelize, DataTypes) => {
  const busker = sequelize.define('busker', {
    name: DataTypes.STRING,
    musicType: DataTypes.STRING,
    description: DataTypes.TEXT,
    rating: DataTypes.FLOAT
  }, {});
  busker.associate = function(models) {
    // associations can be defined here
    models.busker.belongsTo(models.user)
    models.busker.belongsToMany(modles.location, { through: 'buskerLocation'})
  };
  return busker;
};