import express from 'express'
import helmet from 'helmet'
import http from 'http'
import morgan from 'morgan'
import path from 'path'
import bodyParser from 'body-parser'

import { authRouter } from './routes/authRouter'
import { anomalyCaseRouter } from './routes/anomalyCaseRouter'
import { insidersRouter } from './routes/insidersRouter'
import { isProdEnv } from './utilities/misc'

export function createServer(): http.Server {
    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static(path.join(__dirname, 'public')))
    app.use(bodyParser.json())

    if (isProdEnv()) {
        app.use(helmet())
    } else {
        app.use(morgan('dev'))
    }

    app.use('/api/v1' + authRouter.base, authRouter)
    app.use('/api/v1' + anomalyCaseRouter.base, anomalyCaseRouter)
    app.use('/api/v1' + insidersRouter.base, insidersRouter)

    return http.createServer(app)
}
