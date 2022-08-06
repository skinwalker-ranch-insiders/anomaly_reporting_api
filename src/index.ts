import './bootstrap'

import { database } from './database'
import { createServer } from './server'
import { logger } from './utilities/misc'

const port = process.env.PORT ?? 3000

function main(args: string[]) {
    const server = createServer()

    logger.info(`Application starting with args: ${args.join(', ')}`)

    database.initialize().then(() => {
        logger.info('Database initialized')

        server.listen(port, () => {
            logger.info(`Server started on port: ${port}`)
        })
    })
}

main(process.argv)
