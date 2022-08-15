import { NextFunction, Request, Response } from 'express'

import { createToken, readToken } from '../../utilities/jwt'
import { logger } from '../../utilities/misc'

/**
 * Requires a valid JWT in the request's `authorization` header as a bearer token.
 * Also refreshes the token, if valid, to extend the expiration date
 * @param request
 * @param response
 * @param next
 */
export async function requireValidToken(request: Request, response: Response, next: NextFunction): Promise<void> {
    const authorization = request.header('authorization')
    const token = authorization?.replace(/Bearer\s/, '')

    if (!token) {
        response.sendStatus(401)
    } else try {
        const user = await readToken(token)

        try {
            const refreshedToken  = await createToken(user)

            response.setHeader('authorization', `Bearer ${refreshedToken}`)
            next()
        } catch (error) {
            logger.err(error)
            response.sendStatus(500)
        }
    } catch (error) {
        logger.err(error)
        response.sendStatus(401)
    }
}
