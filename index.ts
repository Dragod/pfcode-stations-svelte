import express, { Express } from 'express'

import morgan from 'morgan'

import dotenv from 'dotenv'

import path from 'path'

import cors from 'cors'

import apiRouter from './server/api'

dotenv.config()

const app: Express = express()

const port = process.env.PORT

const rootDir = path.resolve(__dirname, '../../dist')

if (process.env.CORS == "true") {

    console.log("cors on")

    app.use(cors())

}

app.use(morgan('dev'))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/', express.static(path.join(rootDir, 'vite')))

app.use('/api', apiRouter)

app.listen(port, () => {

    console.log(`Server is running on port ${port}`)

})
