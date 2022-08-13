import { observedEventService } from '../services/observedEventService'
import { createRouter, get } from '../utilities/router'
import { requireValidToken } from './middleware/requireValidToken'
import { HttpError } from '../utilities/error'
import { logger } from '../utilities/misc'

/**
 * Contains routes for retrieving and managing events observed by insiders
 */
export const observedEventRouter = createRouter('/observed_events', [requireValidToken], [
    /**
     * Get a list of all events that match the provided sorting and filtering criteria
     */
    get('/',  [], async (request, response) => {
        try {
            response.json(await observedEventService.list())
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