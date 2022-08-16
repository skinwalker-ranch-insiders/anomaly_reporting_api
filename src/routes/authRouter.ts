import { swrService } from '../services/swrService'
import { createRouter, post } from '../utilities/router'
import { createToken } from '../utilities/jwt'
import { env, isProdEnv, logger } from '../utilities/misc'

const COOKIE_NAME = env('COOKIE_NAME', 'token')
const COOKIE_EXP = env('COOKIE_EXP', '0')

export const authRouter = createRouter('/authenticate', [], [
    post('/', [], async (request, response) => {
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
            logger.err(error)
            response.clearCookie(COOKIE_NAME)
            response.sendStatus(401)
        }
    })
])
