// Require passport and any passport strategies you wish to use.
let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy

// Reference the models folder to access the db
let db = require('../models')

// Serialization and Deserialization functions
// These are for passport to use to store and lookup the user info
// Serialize: Reduce the user to just the unique ID
//In this instance, CB stands for "callback"
passport.serializeUser((user, cb) => {
    // callback function params: error message (null if no error); user data (only the id)
    cb(null, user.id)
})

// Deserialize: Takes a user ID and looks up the rest of the information pertinent to that ID
passport.deserializeUser((id, cb) => {
    db.user.findByPk(id)
    .then(user => {
        //callback(errorMessage, userData)
        cb(null, user)
    })
    .catch(cb)
})

// Implement the local strategy (local database)
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, cb) => {
    // Try looking up the user by their email
    db.user.findOne({
        where: { email: email }
    })
    .then(foundUser => {
        // Check if user is found; then check the user's password input
        if(!foundUser || !foundUser.validPassword(password)){
            // Uh-oh, bad username or maybe password didn't match
            cb(null, null)
        }
        else {
            // Valid user & valid password
            cb(null, foundUser)
        }
    })
    .catch(cb)
}))

// Make sure you can include this file in other files!

module.exports = passport