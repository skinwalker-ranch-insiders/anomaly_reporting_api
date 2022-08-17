import { NextFunction, Request, Response } from 'express'

import { readTokenFromRequest } from '../../utilities/jwt'
import { RoleName } from '../../utilities/enum'

/**
 * Requires admin permissions in order to delete entities.
 * @param request
 * @param response
 * @param next
 */
export async function requireDeletePermission(request: Request, response: Response, next: NextFunction): Promise<void> {
    const authedUser = await readTokenFromRequest(request)

    if (authedUser.role.name === RoleName.Admin) {
        next()
    } else {
        response.sendStatus(403)
    }
}