import express from 'express'

import { getStations, getStationsById, getFavorites, insertStation, addStation } from '../controllers/stationsController'

import dotenv from 'dotenv'

dotenv.config({ path: './.env' })

const router = express.Router()

router.get('/stations', getStations)

router.get('/stations/:id', getStationsById)

router.get('/favorites', getFavorites)

router.post('/stations', addStation)

export default router