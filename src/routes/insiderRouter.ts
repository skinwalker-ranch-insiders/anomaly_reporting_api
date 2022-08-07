import { insidersService } from '../services/insidersService'
import { createRouter, del, get, patch } from '../utilities/router'
import { requireValidToken } from './middleware/requireValidToken'
import { requireDeletePermission } from './middleware/requireDeletePermission'
import { requireEditPermission } from './middleware/requireEditPermission'

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
            response.sendStatus(404)
        } else try {
            response.json(await insidersService.getInsiderById(insiderId))
        } catch {
            response.sendStatus(404)
        }
    }),
    /**
     * Update an insider by their ID
     * (Requires edit permissions: must be admin or the insider who owns this account)
     */
    patch('/:insider_id', [requireEditPermission], async (request, response) => {
        // TODO
    }),
    /**
     * Delete an insider by their id
     * (Requires delete permissions: must be admin)
     */
    del('/:insider_id', [requireDeletePermission], async (request, response) => {
        // TODO
    })
])