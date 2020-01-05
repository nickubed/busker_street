'use strict';
module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define('location', {
    address: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: "Please enter a valid address."
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255],
        msg: "Please enter a valid city name."
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 13],
        msg: "Please enter a valid state name."
      }
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