import 'express-async-errors'

import cookieParser from 'cookie-parser'
import express from 'express'
import helmet from 'helmet'
import http, { Server } from 'http'
import morgan from 'morgan'
import path from 'path'

import apiRouter from './routes/api'
import { cookieProps } from './routes/auth-router'

export function createServer(): Server {
    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(express.static(path.join(__dirname, 'public')))
    app.use(cookieParser(cookieProps.secret))

    if (process.env.NODE_ENV === 'production') {
        app.use(helmet())
    } else {
        app.use(morgan('dev'))
    }

    app.use('/api', apiRouter)

    return http.createServer(app)
}
