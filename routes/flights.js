import { Router } from "express"
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()
router.get('/', flightsCtrl.index)
// router.get('/new', flightsCtrl.new)
router.get('/add', flightsCtrl.add)
// router.post('/', flightsCtrl.create)
router.get('/:flightNo', flightsCtrl.show)

router.get('/:flightNo/edit', flightsCtrl.edit)


router.post('/', flightsCtrl.create)

router.delete('/:flightNo', flightsCtrl.delete)

export { router }