import { insidersService } from '../services/insidersService'
import { HttpError } from '../utilities/error'
import { logger } from '../utilities/misc'
import { createRouter, get, patch } from '../utilities/router'
import { requireValidToken } from './middleware/requireValidToken'
import { requireEditPermission } from './middleware/requireEditPermission'

/**
 * Contains routes to retrieve and manage insiders
 * (Requires a valid auth token)
 */
export const insiderRouter = createRouter('/insiders', [requireValidToken], [
    /**
     * Retrieve a single insider by their ID
     */
    get('/:insider_id', [], async (request, response) => {
        try {
            const insiderId = Number.parseInt(request.params['insider_id'])

            if (Number.isNaN(insiderId)) {
                response.status(400)
                response.send(`Invalid path parameter insider_id: ${insiderId}`)
            } else {
                response.json(await insidersService.getInsiderById(insiderId))
            }
        } catch (error) {
            if (error instanceof HttpError) {
                response.status(error.status)
                response.send(error.message)
            } else {
                logger.err(error)
                response.sendStatus(500)
            }
        }
    }),
    /**
     * Update an insider by their ID
     * (Requires edit permissions: must be admin or the insider who owns this account)
     */
    patch('/:insider_id', [requireEditPermission], async (request, response) => {
         try {
             const insiderId = Number.parseInt(request.params['insider_id'])

             if (Number.isNaN(insiderId)) {
                 response.status(400)
                 response.send(`Invalid path parameter insider_id: ${insiderId}`)
             } else {
                 response.json(await insidersService.updateInsider(insiderId, request.body))
             }
        } catch (error) {
            if (error instanceof HttpError) {
                response.status(error.status)
                response.send(error.message)
            } else {
                logger.err(error)
                response.sendStatus(500)
            }
        }
    })
])