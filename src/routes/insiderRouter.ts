import { insidersService } from '../services/insidersService'
import { createRouter, del, get, patch } from '../utilities/router'
import { requireValidToken } from './middleware/requireValidToken'
import { requireDeletePermission } from './middleware/requireDeletePermission'
import { requireEditPermission } from './middleware/requireEditPermission'
import { HttpError } from '../utilities/error'

/**
 * Contains routes to retrieve and manage insiders
 * (Requires a valid auth token)
 */
export const insiderRouter = createRouter('/insiders', [requireValidToken], [
    /**
     * Retrieve a single insider by their id
     */
    get('/:insider_id', [], async (request, response) => {
        const insiderId = Number.parseInt(request.params['insider_id'])

        if (Number.isNaN(insiderId)) {
            response.sendStatus(400)
        } else try {
            response.json(await insidersService.getInsiderById(insiderId))
        } catch (error) {
            if (error instanceof HttpError) {
                response.status(error.status)
                response.send(error.message)
            } else {
                response.sendStatus(500)
            }
        }
    }),
    /**
     * Update an insider by their ID
     * (Requires edit permissions: must be admin or the insider who owns this account)
     */
    patch('/:insider_id', [requireEditPermission], async (request, response) => {
        const insiderId = Number.parseInt(request.params['insider_id'])

        if (Number.isNaN(insiderId)) {
            response.sendStatus(400)
        } else try {
            response.json(await  insidersService.updateInsider(request.body))
        } catch (error) {
            if (error instanceof HttpError) {
                response.status(error.status)
                response.send(error.message)
            } else {
                response.sendStatus(500)
            }
        }
    }),
    /**
     * Delete an insider by their id
     * (Requires delete permissions: must be admin)
     */
    del('/:insider_id', [requireDeletePermission], async (request, response) => {
        // TODO
    }),
    /**
     * Retrieve an array of all insider roles
     */
    get('/roles', [], async (request, response) => {
        try {
            response.json(await insidersService.listRoles())
        } catch (error) {
            if (error instanceof HttpError) {
                response.status(error.status)
                response.send(error.message)
            } else {
                response.sendStatus(500)
            }
        }
    })
])