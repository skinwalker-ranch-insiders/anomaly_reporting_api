import { NextFunction, Request, Response } from 'express'

import { verifyToken } from '../../utilities/jwt'

/**
 * Requires a valid JWT in the request's `authorization` header as a bearer token
 * @param request
 * @param response
 * @param next
 */
export async function requireValidToken(request: Request, response: Response, next: NextFunction): Promise<void> {
    const authorization = request.header('authorization')
    const token = authorization?.replace(/Bearer\s/, '') // TODO store token in secure cookie

    if (await verifyToken(token)) {
        next()
    } else {
        response.sendStatus(401)
    }
}