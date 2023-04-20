import { Flight } from "../models/flight.js"
import { Meal } from '../models/meal.js'

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
  .populate('meals')
  .then(flight=> {
    Meal.find({_id: {$nin: flight.meals}})
    .then(meals => {
      res.render('flights/show', {
        title: 'Flight Detail',
        flight: flight,
        meals: meals,
      })
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

function addToMeals(req, res){
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.meals.push(req.body.mealId)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/flights')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function deleteTicket(req, res) {
  console.log('TICKET DELETE WORKS!')
  Flight.findById(req.params.flightId)
  .then(flight => {
    const ticket = flight.tickets.id(req.params.ticketId)
    flight.tickets.remove(ticket)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}


export {
  index,
  addFlight as add,
  create,
  show,
  deleteFlight as delete,
  edit,
  update,
  deleteTicket,
  addToMeals
}