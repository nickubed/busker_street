'use strict';

let bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname: {
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Please have a first name. It\'s really the least I can ask.'
        }
      }
    },
    lastname: DataTypes.STRING,
    email: {
     type: DataTypes.STRING,
     validate: {
       isEmail: {
         msg: 'Hey, please give a valid email address! 🐶'
       }
     }
    },
    username: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    password: {
     type: DataTypes.STRING,
     validate: {
       len: {
         args: [6, 25],
         msg: 'Your password must be between 6 and 25 characters.'
       }
     }
    },
    photoUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: 'No picture?!'
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
    let correctPassword = bcrypt.compareSync(typedinPassword, this.password)
    //Return the result of that comparison
    return correctPassword
  }

  return user;
};