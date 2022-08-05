import './bootstrap'

import logger from 'jet-logger'
import { createServer } from './server'
import {database} from "./database";

const port = process.env.PORT ?? 3000

function main(args: string[]) {
    const server = createServer()

    logger.info(
        args.length > 0
            ? `Application starting with args: ${args.join(', ')}`
            : 'Application starting'
    )

    database.initialize().then(() => {
        logger.info('Database initialized')

        server.listen(port, () => {
            logger.info(`Server started on port: ${port}`)
        })
    })
}

main(process.argv)
