let router = require('express').Router()
let db = require('../models')
let isLoggedIn = require('../middleware/isLoggedIn')
// let mapboxgl = require('mapbox-gl')

router.get('/', (req, res) => {
    db.busker.findAll({
        include: [db.location, db.user]
    })
    .then(buskers => {
        // mapboxgl.accessToken = 'pk.eyJ1Ijoibmlja3ViZWQiLCJhIjoiY2s0YWl3ZjJ6MDRnYTNrbzV3aTQ1bGlzcyJ9.BB2C_W2tJ5gK3Y_GhkBVSQ';
        // var map = new mapboxgl.Map({
        // container: 'map', // container id
        // style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        // center: [-122.3321, 47.6062], // starting position [lng, lat]
        // zoom: 9 // starting zoom
        // });
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
    db.busker.create({
        name: req.body.name,
        musicType: req.body.musicType,
        description: req.body.description,
        rating: req.body.rating,
        userId: req.body.userId })
    db.location.create({
        //Needs functionality to allow it to populate buskerLocation
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        lat: req.body.lat,
        long: req.body.long,
        buskerLocation: req.body.id
    })
    .then(function(busker) {
        console.log(busker.get())
        res.redirect('/busker')
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})

module.exports = router;