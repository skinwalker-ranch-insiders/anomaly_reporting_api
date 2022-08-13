import { insidersService } from '../services/insidersService'
import { HttpError } from '../utilities/error'
import { logger } from '../utilities/misc'
import { createRouter, get } from '../utilities/router'
import { requireValidToken } from './middleware/requireValidToken'

export const systemRouter = createRouter('/system', [requireValidToken], [
    /**
     * Retrieve an array of all insider roles
     */
    get('/insider_roles', [], async (request, response) => {
        try {
            response.json(await insidersService.listRoles())
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
])