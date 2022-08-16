import { NextFunction, Request, Response } from 'express'
import { IdField, RoleName } from '../../utilities/enum'
import { readTokenFromRequest } from '../../utilities/jwt'
import { HttpError } from '../../utilities/error'
import { observedEventService } from '../../services/observedEventService'

export async function requireEditPermission(request: Request, response: Response, next: NextFunction): Promise<void> {
    const authedUser = await readTokenFromRequest(request)

    if (IdField.Insider in request.params) {
        const insiderId = Number.parseInt(request.params[IdField.Insider])

        if (authedUser.role.name === RoleName.Admin || authedUser.id === insiderId) {
            next()
        } else {
            response.sendStatus(403)
        }
    } else if (IdField.ObservedEvent in request.params) {
        const eventId = Number.parseInt(request.params[IdField.ObservedEvent])

        if (Number.isNaN(eventId)) {
            response.status(400)
            response.send(`Invalid path parameter ${IdField.ObservedEvent}: ${eventId}`)
        } else if (authedUser.role.name !== RoleName.Member) {
            next()
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
