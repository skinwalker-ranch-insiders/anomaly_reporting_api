import { NextFunction, Request, Response } from 'express'

import { COOKIE_EXP, COOKIE_NAME } from '../../utilities/constants'
import { createToken, readToken } from '../../utilities/jwt'
import { isProdEnv, logger } from '../../utilities/misc'

/**
 * Requires a valid JWT in a signed cookie.
 * Also refreshes the token, if valid, to extend the expiration date
 * @param request
 * @param response
 * @param next
 */
export async function requireValidToken(request: Request, response: Response, next: NextFunction): Promise<void> {
    const token = request.signedCookies[COOKIE_NAME]

    if (!token) {
        response.sendStatus(401)
    } else try {
        const user = await readToken(token)

        try {
            const refreshedToken  = await createToken(user)

            response.cookie(COOKIE_NAME, refreshedToken, {
                maxAge: Number.parseInt(COOKIE_EXP),
                secure: isProdEnv(),
                httpOnly: true,
                signed: true
            })

            next()
        } catch (error) {
            logger.err(error)
            response.clearCookie(COOKIE_NAME)
            response.sendStatus(500)
        }
    } catch (error) {
        logger.err(error)
        response.clearCookie(COOKIE_NAME)
        response.sendStatus(401)
    }
}
