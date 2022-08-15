import { NextFunction, Request, Response } from 'express'

import { createToken, readToken } from '../../utilities/jwt'
import { env, isProdEnv, logger } from '../../utilities/misc'

const COOKIE_NAME = env('COOKIE_NAME', 'token')
const COOKIE_EXP = env('COOKIE_EXP', '0')

/**
 * Requires a valid JWT in the request's `authorization` header as a bearer token.
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
            response.sendStatus(500)
        }
    } catch (error) {
        logger.err(error)
        response.sendStatus(401)
    }
}
