import { observedEventService } from '../services/observedEventService'
import { createRouter, get, post } from '../utilities/router'
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
    }),
    post('/', [], async (request, response) => {
        try {
            response.json(await observedEventService.createEvent(request.body))
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
    get('/:observed_event_id', [], async (request, response) => {
        try {
            const eventId = Number.parseInt(request.params['observed_event_id'])

            if (Number.isNaN(eventId)) {
                response.status(400)
                response.send(`Invalid path parameter observed_event_id: ${eventId}`)
            } else {
                response.json(await observedEventService.getEventById(eventId))
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
    get('/:observed_event_id/attachments', [], async (request, response) => {
        try {
            const eventId = Number.parseInt(request.params['observed_event_id'])

            if (Number.isNaN(eventId)) {
                response.status(400)
                response.send(`Invalid path parameter observed_event_id: ${eventId}`)
            } else {
                response.json(await observedEventService.listEventAttachments(eventId))
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
    get('/:observed_event_id/comments', [], async (request, response) => {
        try {
            const eventId = Number.parseInt(request.params['observed_event_id'])

            if (Number.isNaN(eventId)) {
                response.status(400)
                response.send(`Invalid path parameter observed_event_id: ${eventId}`)
            } else {
                response.json(await observedEventService.listEventComments(eventId))
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
    get('/:observed_event_id/likes', [], async (request, response) => {
        try {
            const eventId = Number.parseInt(request.params['observed_event_id'])

            if (Number.isNaN(eventId)) {
                response.status(400)
                response.send(`Invalid path parameter observed_event_id: ${eventId}`)
            } else {
                response.json(await observedEventService.listEventLikes(eventId))
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
    get('/:observed_event_id/escalation_votes', [], async (request, response) => {
        try {
            const eventId = Number.parseInt(request.params['observed_event_id'])

            if (Number.isNaN(eventId)) {
                response.status(400)
                response.send(`Invalid path parameter observed_event_id: ${eventId}`)
            } else {
                response.json(await observedEventService.listEventEscalationVotes(eventId))
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
    get('/:observed_event_id/change_logs', [], async (request, response) => {
        try {
            const eventId = Number.parseInt(request.params['observed_event_id'])

            if (Number.isNaN(eventId)) {
                response.status(400)
                response.send(`Invalid path parameter observed_event_id: ${eventId}`)
            } else {
                response.json(await observedEventService.listEventChangeLogs(eventId))
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