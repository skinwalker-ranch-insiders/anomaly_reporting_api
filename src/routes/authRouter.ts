import { swrService } from '../services/swrService'
import { UserCredentials } from '../payloads/userCredentials'
import { HttpError } from '../utilities/error'
import { createRouter, post } from '../utilities/router'
import { createToken } from '../utilities/jwt'
import { isProdEnv, logger } from '../utilities/misc'
import { COOKIE_EXP, COOKIE_NAME } from '../utilities/constants'

/**
 * Contains routes related to logging in and out of the application
 */
export const authRouter = createRouter('/authenticate', [], [
    /**
     * Authenticate with the main SWR website and then generate a JWT and signed cookie
     */
    post<UserCredentials>('/', [], async (request, response) => {
        try {
            const authedUser = await swrService.login(request.body)

            try {
                const token = await createToken(authedUser)

                response.cookie(COOKIE_NAME, token, {
                    maxAge: Number.parseInt(COOKIE_EXP),
                    secure: isProdEnv(),
                    httpOnly: true,
                    signed: true
                })

                response.json(authedUser)
            } catch (error) {
                logger.err(error)
                response.clearCookie(COOKIE_NAME)
                response.sendStatus(500)
            }
        } catch (error) {
            response.clearCookie(COOKIE_NAME)
            
            if (error instanceof HttpError) {
                response.status(error.status)
                response.send(error.message)
            } else {
                logger.err(error)
                response.sendStatus(401)
            }
        }
    })
])
