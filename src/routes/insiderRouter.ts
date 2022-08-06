import { insidersService } from '../services/insidersService'
import { createRouter, del, get } from '../utilities/router'
import { requireValidToken } from './middleware/requireValidToken'
import { requireDeletePermission } from './middleware/requireDeletePermission'

/**
 * Contains routes to retrieve and manage insiders
 */
export const insiderRouter = createRouter('/insiders', [requireValidToken], [
    /**
     * Retrieve a single insider by their id
     */
    get('/:insider_id', [], async (request, response) => {
        const insiderId = Number.parseInt(request.params['insider_id'])

        try {
            response.json(await insidersService.getInsiderById(insiderId))
        } catch {
            response.sendStatus(404)
        }
    }),
    /**
     * Delete an insider by their id
     * (Requires delete permissions)
     */
    del('/:insider_id', [requireDeletePermission], async (request, response) => {
        // TODO
    })
])