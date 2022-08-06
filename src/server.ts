import express from 'express'
import helmet from 'helmet'
import http from 'http'
import morgan from 'morgan'
import path from 'path'
import bodyParser from 'body-parser'

import { authRoutes } from './routes/authRoutes'
import { anomalyCaseRoutes } from './routes/anomalyCaseRoutes'
import { insidersRoutes } from './routes/insidersRoutes'
import { isProdEnv } from './utilities/misc'

export function createServer(): http.Server {
    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(express.static(path.join(__dirname, 'public')))
    app.use(bodyParser.json())

    if (isProdEnv()) {
        app.use(helmet())
    } else {
        app.use(morgan('dev'))
    }

    app.use('/api/v1' + authRoutes.base, authRoutes)
    app.use('/api/v1' + anomalyCaseRoutes.base, anomalyCaseRoutes)
    app.use('/api/v1' + insidersRoutes.base, insidersRoutes)

    return http.createServer(app)
}
