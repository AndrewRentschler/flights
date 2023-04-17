import { Flight } from "../models/flight.js"

function index(req, res) {
  Flight.find({})
  .then(flights =>
    res.render("flights/index", {
      title: "All Flights",
      flights: flights
    })
  )
  .catch(error => { // If there's an error, console.log it and redirect back home!
    console.log(error)
    res.redirect('/')
  })
}

function addFlight(req, res) {
  console.log("init controller add")
  res.render("flights/new", {
    title: "Add Flight"
  })
}

function create(req, res) {
  console.log('init controller create')
  console.log(req.body)
  Flight.create(req.body)
  .then(flight => {
    res.redirect('/add')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/add')
  })
}

function show(req, res) {
  console.log("init ctrl show")
  console.log(req.params)
  Flight.findById(req.params.flightNo)
  .then(flight=> {
    res.render('flights/show', {
      title: "Flight",
      flights: flights,
      })
  })
  .catch(error => { // If there's an error, console.log it and redirect back home!
    console.log(error)
    res.redirect('/')
  })
}


export {
  index,
  addFlight as add,
  create,
  show
}