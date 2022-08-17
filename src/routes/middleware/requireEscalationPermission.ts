import { NextFunction, Request, Response } from 'express'

import { readTokenFromRequest } from '../../utilities/jwt'
import { IdField, RoleName, StatusName } from '../../utilities/enum'
import { notIn } from '../../utilities/misc'
import { observedEventService } from '../../services/observedEventService'
import { HttpError } from '../../utilities/error'
import { canRoleNameEscalateStatusName } from '../../utilities/review'

/**
 * Requires the proper level of review permissions relative to the entity's current status.
 * @param request
 * @param response
 * @param next
 */
export async function requireEscalationPermission(request: Request, response: Response, next: NextFunction): Promise<void> {
    const authedUser = await readTokenFromRequest(request)
    const roleName = authedUser.role.name as RoleName

    if (roleName === RoleName.Admin || roleName === RoleName.SWRTeam) {
        next()
    } else if (notIn(request.params, IdField.ObservedEvent)) {
        response.sendStatus(403)
    } else {
        const eventId = Number.parseInt(request.params[IdField.ObservedEvent])

        if (Number.isNaN(eventId)) {
            response.status(400)
            response.send(`Invalid path parameter ${IdField.ObservedEvent}: ${eventId}`)
        } else try {
            const existingEvent = await observedEventService.getEventById(eventId)
            const statusName = existingEvent.observedEventStatus.name as StatusName

            if (canRoleNameEscalateStatusName(roleName, statusName)) {
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
    }
}