import { UserCredentials } from '../payloads/userCredentials'
import { swrService } from '../services/swrService'
import { createRouter, post } from '../utilities/router'
import logger from "jet-logger";

export const authRoutes = createRouter('/auth', [
    post('/', async (request, response) => {
        try {
            response.json(await swrService.login(request.body as UserCredentials))
        } catch (error) {
            logger.err(error)
            response.sendStatus(401)
        }
    })
])