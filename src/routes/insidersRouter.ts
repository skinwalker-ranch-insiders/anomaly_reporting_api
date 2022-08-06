import { insidersService } from '../services/insidersService'
import { createRouter, del, get } from '../utilities/router'
import { requireValidToken } from './middleware/requireValidToken'
import { requireDeletePermission } from './middleware/requireDeletePermission'

export const insidersRouter = createRouter('/insiders', [requireValidToken], [
    get('/:insider_id', [], async (request, response) => {
        const insiderId = request.params['insider_id']

        try {
            response.json(await insidersService.getInsiderById(Number.parseInt(insiderId)))
        } catch {
            response.sendStatus(404)
        }
    }),
    del('/:insider_id', [requireDeletePermission], async (request, response) => {
        // TODO
    })
])