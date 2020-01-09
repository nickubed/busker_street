const db = require('../models')
let router = require('express').Router()
let isLoggedIn = require('../middleware/isLoggedIn')
let isAdminLoggedIn = require('../middleware/isAdminLoggedIn')


router.get('/', isLoggedIn, (req, res) => {
    db.user.findOne({
        where: req.params.id,
        include: [ db.busker ]
    })
    res.render('profile/main')
})

router.get('/admin', isAdminLoggedIn, (req, res) => {
    res.render('profile/admin')
})


module.exports = router