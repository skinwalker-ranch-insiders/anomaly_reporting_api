import { anomalyCaseService } from '../services/anomalyCaseService'
import { createRouter, get } from '../utilities/router'
import { requireValidToken } from './middleware/requireValidToken'

/**
 * Contains routes for retrieving and managing cases submitted by insiders
 */
export const anomalyCaseRouter = createRouter('/anomaly_cases', [requireValidToken], [
    /**
     * Get a list of all cases that match the provided sorting and filtering criteria
     */
    get('/',  [], async (request, response) => {
        try {
            response.json(await anomalyCaseService.list())
        } catch {
            response.json([])
        }
    })
])