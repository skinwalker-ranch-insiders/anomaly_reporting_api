import { swrService } from '../services/swrService'
import { createRouter, post } from '../utilities/router'
import logger from "jet-logger";

export const authRouter = createRouter('/auth', [], [
    post('/', [], async (request, response) => {
        try {
            response.json(await swrService.login(request.body))
        } catch (error) {
            logger.err(error)
            response.sendStatus(401)
        }
    })
])