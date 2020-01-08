const db = require('../models')
let router = require('express').Router()
let isLoggedIn = require('../middleware/isLoggedIn')
let isAdminLoggedIn = require('../middleware/isAdminLoggedIn')

router.get('/', isLoggedIn, (req, res) => {
    db.user.findOne({
        where: req.params.id,
        include: [ db.busker ]
    }).then(user => {
        res.render('profile/main', { user, mapkey: process.env.MAPBOX_TOKEN })
    })
    .catch(err => {
        console.log('error', err)
    })
})

router.get('/admin', isAdminLoggedIn, (req, res) => {
    res.render('profile/admin')
})



module.exports = router