import { anomalyCaseService } from '../services/anomalyCaseService'
import { createRouter, get } from '../utilities/router'

export const anomalyCaseRoutes = createRouter('/anomaly_cases', [
    get('/', async (request, response) => {
        try {
            response.json(await anomalyCaseService.list())
        } catch {
            response.json([])
        }
    })
])