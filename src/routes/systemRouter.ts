import { insidersService } from '../services/insidersService'
import { HttpError } from '../utilities/error'
import { logger } from '../utilities/misc'
import { createRouter, get } from '../utilities/router'
import { requireValidToken } from './middleware/requireValidToken'
import { observedEventService } from '../services/observedEventService'

/**
 * Contains routes for retrieving data relevant to making the overall system function
 * (Roles, event types & categories, etc.)
 */
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
    /**
     * Retrieve an array of all valid event statuses
     */
    get('/observed_event_statuses', [], async (request, response) => {
        try {
            response.json(await observedEventService.listStatuses())
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
     * Retrieve an array of all event types
     */
    get('/observed_event_types', [], async (request, response) => {
        try {
            response.json(await observedEventService.listTypes())
        } catch (error) {
            if (error instanceof HttpError){
                response.status(error.status)
                response.send(error.message)
            } else {
                logger.err(error)
                response.sendStatus(500)
            }
        }
    }),
    /**
     * Retrieve an array of all event type sub-categories
     */
    get('/observed_event_type_categories', [], async (request, response)=>{
        try {
            response.json(await observedEventService.listTypeCategories())
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
     * Retrieve an array of all event camera views
     */
    get('/observed_event_camera_views', [], async (request, response)=>{
        try {
            response.json(await observedEventService.listCameraViews())
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
     * Retrieve an array of all event viewport positions
     */
    get('/observed_event_viewport_positions', [], async (request, response)=>{
        try {
            response.json(await observedEventService.listViewportPositions())
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