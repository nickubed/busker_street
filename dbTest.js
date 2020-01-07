var db = require('./models')
// var async = require('async')
// Create a category: Category model must exist and be migrated

// db.busker.create({
//   name: 'Smokey Dave',
//   musicType: 'Back-alley jazz',
//   description: `Dons many hats at once and has a different band every time I've seen him`,
//   rating: 3,
//   userId: 1
// }).then(function(busker) {
//   console.log(busker.get())
// })

// router.get('/results', function (req, res) {
  // TODO forward geocode using the req.query
  geocode.forwardGeocode({
    query: `${req.location.address}, ${req.location.city}, ${req.query.state}`,
    types: ['place'],
    countries: ['us']
  }).send()
  .then(function(response) {
    let results = response.body.features.map(result => {
      return {
        name: result.place_name,
        lat: result.center[1],
        long: result.center[0]
      }
    })
    res.render('cities/results', { query: req.query, results });
  })
// });