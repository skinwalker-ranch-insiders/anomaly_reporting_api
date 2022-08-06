import { insidersService } from '../services/insidersService'
import { createRouter, get } from '../utilities/router'

export const insidersRoutes = createRouter('/insiders', [
    get('/:insider_id', async (request, response) => {
        const insiderId = request.params['insider_id']

        try {
            response.json(await insidersService.getInsiderById(Number.parseInt(insiderId)))
        } catch {
            response.sendStatus(404)
        }
    })
])