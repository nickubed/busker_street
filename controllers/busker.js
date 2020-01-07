require('dotenv').config()
const router = require('express').Router()
const db = require('../models')
const isLoggedIn = require('../middleware/isLoggedIn')
const mbxClient = require('@mapbox/mapbox-sdk')
const mbxGeocode = require('@mapbox/mapbox-sdk/services/geocoding')

const mb = mbxClient({ accessToken: 'pk.eyJ1Ijoibmlja3ViZWQiLCJhIjoiY2s0YWl3ZjJ6MDRnYTNrbzV3aTQ1bGlzcyJ9.BB2C_W2tJ5gK3Y_GhkBVSQ' })
const geocode = mbxGeocode(mb)

router.get('/', (req, res) => {
    db.busker.findAll({
        include: [db.location, db.user]
    })
    .then(buskers => {
        res.render('busker/index', { buskers })
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})

router.get('/add', isLoggedIn, (req, res) => {
    db.user.findOne({
        where: req.params.id
    })
    .then(users => {
        res.render('busker/add', { users })
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})

router.get('/:id', (req, res) => {
    db.busker.findOne({
        where: {id: req.params.id}
    })
    .then(busker => {
        res.render('busker/show', { busker })
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})

router.post('/add', isLoggedIn, (req, res) => {
    let locations = {
        address : req.body.address,
        city : req.body.city,
        state : req.body.state
    }
    db.busker.create({
        name: req.body.name,
        musicType: req.body.musicType,
        description: req.body.description,
        rating: req.body.rating,
        userId: req.body.userId 
    })
        .then(busker => {
            db.location.create({
                address : locations.address,
                city: locations.city,
                state: locations.state
            })
            .then((location) => {
                busker.addLocation(location)
                })
                .catch(generalError => {
                    console.log(err)
                })
            .catch(generalError => {
                console.log(err)
            })
        })
    .then(function(busker) {
        res.redirect('/busker')
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})

module.exports = router;