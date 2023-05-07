import express from 'express'

import { getStations, getStationsById, getFavorites, addStation, addStationValidator } from '../controllers/stationsController'

import dotenv from 'dotenv'

dotenv.config({ path: './.env' })

const router = express.Router()

router.get('/stations', getStations)

router.get('/stations/:id', getStationsById)

router.get('/favorites', getFavorites)

router.post('/stations',addStationValidator, addStation)

export default router