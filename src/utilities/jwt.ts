import { sign, verify } from 'jsonwebtoken'

import { env } from './misc'
import { AuthedUser } from '../payloads/authedUser'
import { Request } from 'express'

const COOKIE_NAME = env('COOKIE_NAME', 'token')
const JWT_SECRET = env('JWT_SECRET', '')

/**
 * Creates and signs a JWT with the users inserted as the token payload
 * @param user
 */
export async function createToken(user: AuthedUser): Promise<string> {
    return new Promise((resolve, reject) => {
        sign({ user }, JWT_SECRET, { expiresIn: '2d' }, (error, token) => {
            if (error) {
                reject(error)
            } else {
                resolve(token!)
            }
        })
    })
}

/**
 * Reads and decodes a JWT with the user object resolved from the token payload
 * @param token
 */
export async function readToken(token: string): Promise<AuthedUser> {
    return new Promise((resolve, reject) => {
        verify(token, JWT_SECRET, (error, payload: any) => {
            if (error) {
                reject(error)
            } else {
                resolve(payload.user as AuthedUser)
            }
        })
    })
}

/**
 * Reads and decodes a JWT from a request (via the signed cookie)
 * @param request
 */
export async function readTokenFromRequest(request: Request): Promise<AuthedUser> {
    return readToken(request.signedCookies[COOKIE_NAME])
}
