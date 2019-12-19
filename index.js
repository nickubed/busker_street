// Required node modules
require('dotenv').config() //Provide access to variables inside .env file.
let express = require('express')
let flash = require('connect-flash')
let layouts = require('express-ejs-layouts')
let session = require('express-session')

// Declare express app variable
let app = express();

// Include passport configuration
let passport = require('./config/passportConfig')

// Set up and middleware
app.set('view engine', 'ejs')
app.use(layouts)
app.use('/', express.static('static'))
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(flash()) //This MUST be below app.use(session), as it is dependent on it!!!
app.use(passport.initialize()) //This MUST be below app.use(session), as it is dependent on it!!!
app.use(passport.session()) //This MUST be below app.use(session), as it is dependent on it!!!

//Custom middleware: add variables to locals for each page.
app.use((req, res, next) => {
    res.locals.alerts = req.flash()
    res.locals.user = req.user
    next()
})

// Add any controllers
app.use('/auth', require('./controllers/auth'))
app.use('/profile', require('./controllers/profile'))
// Add home or catch-all routes
app.get('/', (req, res) => {
    res.render('home')
})

app.get('*', (req, res) => {
    res.render('error')
})

app.listen(process.env.PORT || 3000, () => {console.log('🦊Singin and Dancin🐰')})


