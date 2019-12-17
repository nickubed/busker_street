//Create an express router object
let router = require('express').Router();

//Include a reference to the models for db access
let db = require('../models')

// Define routes
/* ----- Login ----- */
router.get('/login', (req, res) => {
    res.render('auth/login')
})

router.post('/login', (req, res) => {
    res.send(req.body)
})

/* ----- Signup ----- */
router.get('/signup', (req, res) => {
    res.render('auth/signup', { data: {} })
})

router.post('/signup', (req, res) => {
    if(req.body.password != req.body.confirmPassword){
        //User's password verification doesn't match - probably a typo
        req.flash('error', 'Passwords do not match, you dumb bunny!')
        res.render('auth/signup', { data: req.body, alerts: req.flash() })
    }
    else{
        //Attempt to find a user by their email address, if not found, then create a user at the provided email address.
        db.user.findOrCreate({
            where: { email: req.body.email },
            defaults: req.body
        })
        .then(([user, wasCreated]) => {
            if (wasCreated) {
                //This is the intended user action
                //Now, I want to automatically log in the user to their newly created account.
                //TODO: Log in the user.
                res.send('Successful Create User - Go look at DB')
            }
            else{
                //The user already has an account (they may have forgotten this fact)
                req.flash('error', 'You already have an account, dumbass!')
                res.redirect('/auth/login')
            }
        })
        .catch(err => {
            //Print out a general error to the terminal
            console.log('Error when creating a user', err)

            //Check for validation errors (okay for user to see)
            if (err.errors) {
                err.errors.forEach(e => {
                    console.log(e.type, e.message)
                    if (e.type == 'Validation error') {
                        console.log('Entered', e.message)
                        req.flash('error', 'wat')
                        // req.flash('error', e.message)
                    }
                })
            }
            //If an error happened but there is no handler
            else{
                req.flash('error', 'Something Happened?! Please call tech support')
            }
            //redirect to the signup page
            res.redirect('/auth/signup')
        })
    }
})

/* ----- Logout ----- */
router.get('/logout', (req, res) => {
    res.send('GET /auth/logout')
})

// Export the router object so we can include it in other files
module.exports = router;