import { NextFunction, Request, Response } from 'express'

import { IdField, RoleName } from '../../utilities/enum'
import { readTokenFromRequest } from '../../utilities/jwt'
import { HttpError } from '../../utilities/error'
import { observedEventService } from '../../services/observedEventService'

/**
 * Require the ability to edit whichever entity is being targeted.
 * If admin, true.
 * If editing insider, and is owner, true.
 * If editing comment, and is advanced reviewer or swr team or owner, true.
 * If editing event, and is any reviewer or swr team or owner, true.
 * @param request
 * @param response
 * @param next
 */
export async function requireEditPermission(request: Request, response: Response, next: NextFunction): Promise<void> {
    const authedUser = await readTokenFromRequest(request)

    if (authedUser.role.name === RoleName.Admin) {
        next()
    } else if (IdField.Insider in request.params) {
        const insiderId = Number.parseInt(request.params[IdField.Insider])

        if (authedUser.id === insiderId) {
            next()
        } else {
            response.sendStatus(403)
        }
    } else if (IdField.ObservedEventComment in request.params) {
        const commentId = Number.parseInt(request.params[IdField.ObservedEventComment])

        if (authedUser.role.name === RoleName.AdvancedReviewer || authedUser.role.name === RoleName.SWRTeam) {
            next()
        } else if (Number.isNaN(commentId)) {
            response.status(400)
            response.send(`Invalid path parameter ${IdField.ObservedEventComment}: ${commentId}`)
        } else try {
            const existingComment = await observedEventService.getCommentById(commentId)

            if (existingComment.createdBy.id === authedUser.id) {
                next()
            } else {
                response.sendStatus(403)
            }
        } catch (error) {
            if (error instanceof HttpError) {
                response.status(error.status)
                response.send(error.message)
            } else {
                response.sendStatus(500)
            }
        }
    } else if (IdField.ObservedEvent in request.params) {
        const eventId = Number.parseInt(request.params[IdField.ObservedEvent])

        if (authedUser.role.name !== RoleName.Member) {
            next()
        } else if (Number.isNaN(eventId)) {
            response.status(400)
            response.send(`Invalid path parameter ${IdField.ObservedEvent}: ${eventId}`)
        } else try {
            const existingEvent = await observedEventService.getEventById(eventId)

            if (existingEvent.createdBy.id === authedUser.id) {
                next()
            } else {
                response.sendStatus(403)
            }
        } catch (error) {
            if (error instanceof HttpError) {
                response.status(error.status)
                response.send(error.message)
            } else {
                response.sendStatus(500)
            }
        }
    } else {
        next()
    }
}
