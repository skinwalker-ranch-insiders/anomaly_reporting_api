import './bootstrap'

import express from 'express'
import path from 'path'
import helmet from 'helmet'
import morgan from 'morgan'
import http from 'http'

import { database } from './database'
import { authRouter } from './routes/authRouter'
import { observedEventRouter } from './routes/observedEventRouter'
import { insiderRouter } from './routes/insiderRouter'
import { systemRouter } from './routes/systemRouter'
import { env, isProdEnv, logger } from './utilities/misc'

const SERVER_PORT = env('SERVER_PORT', '3000')

/**
 * Initializes the database and starts the web server
 * @param args
 */
function main(args: string[]) {
    logger.info(`Application starting with args: ${args.join(', ')}`)

    database.initialize().then(() => {
        logger.info('Database initialized')

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
        app.use('/api/v1' + observedEventRouter.base, observedEventRouter)
        app.use('/api/v1' + insiderRouter.base, insiderRouter)
        app.use('/api/v1' + systemRouter.base, systemRouter)

        http.createServer(app).listen(SERVER_PORT, () => {
            logger.info(`Server started on port: ${SERVER_PORT}`)
        })
    })
}

main(process.argv)
