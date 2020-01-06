'use strict';
module.exports = (sequelize, DataTypes) => {
  const busker = sequelize.define('busker', {
    name: DataTypes.STRING,
    musicType: DataTypes.STRING,
    description: DataTypes.TEXT,
    rating: DataTypes.FLOAT,
    userId: DataTypes.INTEGER
  }, {});
  busker.associate = function(models) {
    // associations can be defined here
    models.busker.belongsTo(models.user)
    models.busker.belongsToMany(models.location, { through: 'buskerLocation'})
  };
  return busker;
};