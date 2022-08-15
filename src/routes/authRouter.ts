import { swrService } from '../services/swrService'
import { createRouter, post } from '../utilities/router'
import logger from "jet-logger";
import { createToken } from '../utilities/jwt'

export const authRouter = createRouter('/auth', [], [
    post('/', [], async (request, response) => {
        try {
            const authedUser = await swrService.login(request.body)

            try {
                const token = await createToken(authedUser)

                response.setHeader('authorization', `Bearer ${token}`)
                response.json(authedUser)
            } catch (error) {
                logger.err(error)
                response.sendStatus(500)
            }
        } catch (error) {
            logger.err(error)
            response.sendStatus(401)
        }
    })
])
