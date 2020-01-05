let router = require('express').Router()
let isLoggedIn = require('../middleware/isLoggedIn')
let isAdminLoggedIn = require('../middleware/isAdminLoggedIn')

router.get('/', isLoggedIn, (req, res) => {
    res.render('profile/main', )
})

router.get('/admin', isAdminLoggedIn, (req, res) => {
    res.render('profile/admin')
})

router.get('/buskerList', isLoggedIn, (req, res) => {
    res.send('Hello')
})

module.exports = router