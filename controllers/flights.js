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
  Flight.findById(req.params.flightId)
  .then(flight=> {
    res.render('flights/show', {
      title: "Flight",
      flight: flight,
      })
  })
  .catch(error => { // If there's an error, console.log it and redirect back home!
    console.log(error)
    res.redirect('/')
  })
}

function deleteFlight(req, res){
  Flight.findByIdAndDelete(req.params.flightId)
  .then(flight => {
    res.redirect("/")
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}
function edit(req,res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    res.render("flights/edit", {
      flight:flight,
      title: "Edit Flight"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function update(req, res) {
  Flight.findByIdAndUpdate(req.params.flightId, req.body, {new:true})
  .then(flight => {
    res.redirect(`/${flight._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}


export {
  index,
  addFlight as add,
  create,
  show,
  deleteFlight as delete,
  edit,
  update
}