import { verify } from 'jsonwebtoken'

import { env } from './misc'

const JWT_SECRET = env('JWT_SECRET', '')

/**
 * Verifies a given JWT against the server's secret
 * @param token
 */
export async function verifyToken(token?: string): Promise<boolean> {
    return new Promise((resolve) => {
        if (!token || !JWT_SECRET) {
            return resolve(false)
        }
        verify(token, JWT_SECRET, (error, user) => {
            if (error) {
                resolve(false)
            } else {
                resolve(true)
            }
        })
    })
}
