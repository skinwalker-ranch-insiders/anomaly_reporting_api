import { DeepPartial } from 'typeorm'

import { database } from '../database'
import { Insider } from '../database/entities/insider'
import { RoleName } from '../utilities/enum'
import { notIn } from '../utilities/misc'
import { dataOptionsService } from './dataOptionsService'
import { InsiderRole } from '../database/entities/insiderRole'
import { HttpError } from '../utilities/error'

/**
 * Includes service calls to create and retrieve insiders from the database
 */
export const insidersService = {
    insidersRepository: database.getRepository(Insider),
    roleRepository: database.getRepository(InsiderRole),
    /**
     * Retrieve a single insider by their user ID
     * @param id
     */
    async getInsiderById(id: number): Promise<Insider | null> {
        const existingInsider = await this.insidersRepository.findOne({
            where: {
                id
            },
            relations: {
                role: true
            }
        })

        if (!existingInsider) {
            throw new HttpError(404, `No insider exists with id: ${id}`)
        }

        return existingInsider
    },
    /**
     * Retrieve a single insider by their email address
     * @param email
     */
    async getInsiderByEmail(email: string): Promise<Insider | null> {
        const existingInsider = this.insidersRepository.findOne({
            where: {
                email
            },
            relations: {
                role: true
            }
        })

        if (!existingInsider) {
            throw new HttpError(404, `No insider exists with email: ${email}`)
        }

        return existingInsider
    },
    /**
     * Create and resolve with a single insider object
     * (May throw an error if `email` field is missing)
     * @param insider
     */
    async createInsider(insider: DeepPartial<Insider>): Promise<Insider> {
        if (notIn(insider, 'email')) {
            throw new HttpError(400, 'Missing required field: `email`')
        }
        if (notIn(insider, 'name')) {
            insider.name = ''
        }
        if (notIn(insider, 'avatarUrl')) {
            insider.avatarUrl = ''
        }
        if (notIn(insider, 'role')) {
            insider.role = await dataOptionsService.getRoleByName(RoleName.Member) ?? undefined
        }
        return this.insidersRepository.save(this.insidersRepository.create(insider))
    },
    /**
     * Update an existing insider with a partial data object
     * (May throw an error if no existing insider exists)
     * @param id
     * @param insider
     */
    async updateInsider(id: number, insider: DeepPartial<Insider>): Promise<Insider> {
        const existingInsider = await this.getInsiderById(id)

        if (!existingInsider) {
            throw new HttpError(404, `No insider exists with id: ${id}`)
        }

        return this.insidersRepository.save(this.insidersRepository.merge(existingInsider, insider))
    },
    /**
     * Retrieve a list of all user roles
     */
    async listRoles(): Promise<InsiderRole[]> {
        return this.roleRepository.find()
    }
}
