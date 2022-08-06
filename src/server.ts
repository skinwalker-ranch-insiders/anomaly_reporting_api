import express from 'express'
import helmet from 'helmet'
import http from 'http'
import morgan from 'morgan'
import path from 'path'

import { authRouter } from './routes/authRouter'
import { anomalyCaseRouter } from './routes/anomalyCaseRouter'
import { insiderRouter } from './routes/insiderRouter'
import { isProdEnv } from './utilities/misc'

export function createServer(): http.Server {
    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static(path.join(__dirname, 'public')))

    if (isProdEnv()) {
        app.use(helmet())
    } else {
        app.use(morgan('dev'))
    }

    app.use('/api/v1' + authRouter.base, authRouter)
    app.use('/api/v1' + anomalyCaseRouter.base, anomalyCaseRouter)
    app.use('/api/v1' + insiderRouter.base, insiderRouter)

    return http.createServer(app)
}
