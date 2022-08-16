import { observedEventService } from '../services/observedEventService'
import { createRouter, get, patch, post } from '../utilities/router'
import { HttpError } from '../utilities/error'
import { readTokenFromRequest } from '../utilities/jwt'
import { logger, notIn } from '../utilities/misc'
import { requireEditPermission } from './middleware/requireEditPermission'
import { requireValidToken } from './middleware/requireValidToken'
import { ObservedEvent } from '../database/entities/observedEvent'
import { DeepPartial } from 'typeorm'
import { ObservedEventAttachment } from '../database/entities/observedEventAttachment'
import { ObservedEventComment } from '../database/entities/observedEventComment'
import { IdField } from '../utilities/enum'

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
    /**
     * Create a new event
     */
    post<DeepPartial<ObservedEvent>>('/', [], async (request, response) => {
        try {
            if (notIn(request.body, 'createdBy')) {
                request.body.createdBy = await readTokenFromRequest(request)
            }
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
    /**
     * Get an event by its ID
     */
    get(`/:${IdField.ObservedEvent}`, [], async (request, response) => {
        try {
            const eventId = Number.parseInt(request.params[IdField.ObservedEvent])

            if (Number.isNaN(eventId)) {
                response.status(400)
                response.send(`Invalid path parameter ${IdField.ObservedEvent}: ${eventId}`)
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
    /**
     * Update an event by its ID
     */
    patch<DeepPartial<ObservedEvent>>(`/:${IdField.ObservedEvent}`, [requireEditPermission], async (request, response) => {
        try {
            const eventId = Number.parseInt(request.params[IdField.ObservedEvent])

            if (Number.isNaN(eventId)) {
                response.status(400)
                response.send(`Invalid path parameter ${IdField.ObservedEvent}: ${eventId}`)
            } else {
                if (notIn(request.body, 'updatedBy')) {
                    request.body.updatedBy = await readTokenFromRequest(request)
                }
                response.json(await observedEventService.updateEvent(eventId, request.body))
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
     * Get a list of attachments for an event by its ID
     */
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
    /**
     * Upload a new attachment to an event by its ID
     */
    post<DeepPartial<ObservedEventAttachment>>('/:observed_event_id/attachments', [requireEditPermission], async (request, response) => {
        try {
            const eventId = Number.parseInt(request.params['observed_event_id'])

            if (Number.isNaN(eventId)) {
                response.status(400)
                response.send(`Invalid path parameter observed_event_id: ${eventId}`)
            } else {
                if (notIn(request.body, 'createdBy')) {
                    request.body.createdBy = await readTokenFromRequest(request)
                }
                response.json(await observedEventService.createEventAttachment(eventId, request.body))
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
     * Get a list of event comments by its ID
     */
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
    /**
     * Add a new comment to an event by its ID
     */
    post<DeepPartial<ObservedEventComment>>('/:observed_event_id/comments', [], async (request, response) => {
        try {
            const eventId = Number.parseInt(request.params['observed_event_id'])

            if (Number.isNaN(eventId)) {
                response.status(400)
                response.send(`Invalid path parameter observed_event_id: ${eventId}`)
            } else {
                if (notIn(request.body, 'createdBy')) {
                    request.body.createdBy = await readTokenFromRequest(request)
                }
                response.json(await observedEventService.createEventComment(eventId, request.body))
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
     * Update an existing comment on an event by its ID
     */
    patch<DeepPartial<ObservedEventComment>>('/:observed_event_id/comments/:observed_event_comment_id', [requireEditPermission], async (request, response) => {
        try {
            const eventId = Number.parseInt(request.params['observed_event_id'])
            const commentId = Number.parseInt(request.params['observed_event_comment_id'])

            if (Number.isNaN(eventId)) {
                response.status(400)
                response.send(`Invalid path parameter observed_event_id: ${eventId}`)
            } else if (Number.isNaN(commentId)) {
                response.status(400)
                response.send(`Invalid path parameter observed_event_comment_id: ${commentId}`)
            } else {
                if (notIn(request.body, 'createdBy')) {
                    request.body.updatedBy = await readTokenFromRequest(request)
                }
                response.json(await observedEventService.updateEventComment(eventId, commentId, request.body))
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