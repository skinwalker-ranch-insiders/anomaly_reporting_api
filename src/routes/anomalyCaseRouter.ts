import { anomalyCaseService } from '../services/anomalyCaseService'
import { createRouter, get } from '../utilities/router'
import {requireValidToken} from "./middleware/requireValidToken";

export const anomalyCaseRouter = createRouter('/anomaly_cases', [requireValidToken], [
    get('/',  [], async (request, response) => {
        try {
            response.json(await anomalyCaseService.list())
        } catch {
            response.json([])
        }
    })
])