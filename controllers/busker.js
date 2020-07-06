require('dotenv').config()
const axios = require('axios')
const router = require('express').Router()
const db = require('../models')
const isLoggedIn = require('../middleware/isLoggedIn')
const mbxClient = require('@mapbox/mapbox-sdk')
const mbxGeocode = require('@mapbox/mapbox-sdk/services/geocoding')
const GEO_URL = 'https://geocoding.geo.census.gov/geocoder/locations/address?street='

const mb = mbxClient({ accessToken: process.env.MAPBOX_TOKEN })
// const geocode = mbxGeocode(mb)

router.get('/', (req, res) => {
    db.busker.findAll({
        include: [db.location, db.user]
    })
    .then(buskers => {
        res.render('busker/index', { buskers, mapkey: process.env.MAPBOX_TOKEN })
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
        where: {id: req.params.id},
        include: [db.location, db.user]
    })
    .then(busker => {
        console.log(busker)
        res.render('busker/show', { busker, mapkey: process.env.MAPBOX_TOKEN })
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})

router.post('/add', isLoggedIn, (req, res) => {
    //Pass location information into geocoder
    axios.get(`${GEO_URL + req.body.address.split(' ').join('+')}&city=${req.body.city}&state=${req.body.state}&benchmark=Public_AR_Census2010&format=json`)
    // geocode.forwardGeocode({
    //     query: `${req.body.address}, ${req.body.city}, ${req.body.state}`,
    //     types: ['place'],
    //     countries: ['us']
    // }).send()
        .then((response) => {
            console.log(response.data)
            if(response.data){
                //responds with geocoded data, which is lat long
                let long = response.data.result.addressMatches[0].coordinates.x
                let lat = response.data.result.addressMatches[0].coordinates.y
                //declaration of locations object
            let locations = {
                    address : req.body.address,
                    city : req.body.city,
                    state : req.body.state,
                    lat: lat,
                    long: long
                }
                    //begin population of db, here we do busker
                    db.busker.create({
                        name: req.body.name,
                        musicType: req.body.musicType,
                        description: req.body.description,
                        rating: req.body.rating,
                        userId: req.body.userId 
                    })
                    //populate location db
                    .then(busker => {
                        db.location.create({
                            address : locations.address,
                            city: locations.city,
                            state: locations.state,
                            lat: locations.lat,
                            long: locations.long
                        })
                    //Adding location & busker to join table
                        .then((location) => {
                            busker.addLocation(location)
                            res.redirect('/');
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    })
            }
            else {
                req.flash('error', `Bad address, I don't know why either.`)
                res.render('busker/add', { alerts: req.flash() })
            }
        })   
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})

router.put('/:id', isLoggedIn, (req, res) => {
    db.busker.findOne({
        where: { id : req.params.id }
    })
    .then((busker) => {
        busker.update({
            description: req.body.description
        })
        res.redirect(`${busker.id}`)
    })
})

router.delete('/:id', isLoggedIn, (req, res) => {
    //remove from the join table
    db.buskerLocation.destroy({
        where: { buskerId: req.params.id }
    })
    .then(() => {
        // delete the category
        db.busker.destroy({
            where: { id: req.params.id }
        })
            .then(destroyedBusker => {
            res.redirect('/')
        })
        .catch(err => {
            console.log("error", err)
            res.render('main/404')
        })
    })
    .catch(err => {
        console.log("error", err)
        res.render('main/404')
    })
})

module.exports = router;