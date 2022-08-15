import { Jwt, sign, verify } from 'jsonwebtoken'

import { env } from './misc'
import { AuthedUser } from '../payloads/authedUser'

const JWT_SECRET = env('JWT_SECRET', '')

/**
 * Creates and signs a JWT with the users inserted as the token payload
 * @param user
 */
export async function createToken(user: AuthedUser): Promise<string> {
    return new Promise((resolve, reject) => {
        sign(user, JWT_SECRET, { expiresIn: '2d' }, (error, token) => {
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
        verify(token, JWT_SECRET, (error, user) => {
            if (error) {
                reject(error)
            } else {
                resolve(user as AuthedUser)
            }
        })
    })
}

/**
 * Verifies a given JWT against the server's secret
 * @param token
 */
export async function verifyToken(token?: string): Promise<boolean> {
    return new Promise((resolve) => {
        if (!token || !JWT_SECRET) {
            return resolve(false)
        }
        verify(token, JWT_SECRET, (error) => {
            if (error) {
                resolve(false)
            } else {
                resolve(true)
            }
        })
    })
}
