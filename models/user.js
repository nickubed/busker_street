'use strict';

let bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: "You can be anyone you want to be. But you can't be that."
        }
      }
    },
    lastname: DataTypes.STRING,
    email: {
     type: DataTypes.STRING,
     validate: {
       isEmail: {
         msg: 'Please enter a valid email address.'
       }
     }
    },
    username: DataTypes.STRING,
    password: {
     type: DataTypes.STRING,
     validate: {
       len: {
         args: [6, 25],
         msg: 'Please enter a valid password.'
       }
     }
    },
    photoUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: 'Please provide a valid photo url.'
        }
      }
    },
    bio: DataTypes.TEXT,
    admin: DataTypes.BOOLEAN
  }, {
    hooks: {
      beforeCreate: pendingUser => {
        if(pendingUser && pendingUser.password) {
          // Hash the password
          let hashedPassword = bcrypt.hashSync(pendingUser.password, 12)

          // Reassign the password field to the newly hashed value
          pendingUser.password = hashedPassword
        }
      }
    }
  });

  user.associate = function(models) {
    // associations can be defined here
  };
  
  user.prototype.validPassword = function(typedInPassword){
    //Determine if typed-in password hashes to same thing as existing hash
    let correctPassword = bcrypt.compareSync(typedInPassword, this.password)
    //Return the result of that comparison
    return correctPassword
  }

  return user;
};