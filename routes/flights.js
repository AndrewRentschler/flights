import { Router } from "express"
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()
router.get('/', flightsCtrl.index)
// router.get('/new', flightsCtrl.new)
router.get('/add', flightsCtrl.add)
// router.post('/', flightsCtrl.create)
router.get('/:flightId', flightsCtrl.show)

router.get('/:flightId/edit', flightsCtrl.edit)


router.post('/', flightsCtrl.create)

router.put("/:flightId", flightsCtrl.update)

router.delete('/:flightId', flightsCtrl.delete)

export { router }