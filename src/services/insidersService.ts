import { DeepPartial } from 'typeorm'

import { database } from '../database'
import { Insider } from '../database/entities/insider'
import { RoleName } from '../utilities/enum'
import { notIn } from '../utilities/misc'
import { dataOptionsService } from './dataOptionsService'

/**
 * Includes service calls to create and retrieve insiders from the database
 */
export const insidersService = {
    insidersRepository: database.getRepository(Insider),

    /**
     * Retrieve a single insider by their user ID
     * @param id
     */
    async getInsiderById(id: number): Promise<Insider | null> {
        return this.insidersRepository.findOne({
            where: {
                id
            },
            relations: {
                role: true
            }
        })
    },

    /**
     * Retrieve a single insider by their email address
     * @param email
     */
    async getInsiderByEmail(email: string): Promise<Insider | null> {
        return this.insidersRepository.findOne({
            where: {
                email
            },
            relations: {
                role: true
            }
        })
    },

    /**
     * Create and resolve with a single insider object
     * @param insider
     */
    async createInsider(insider: DeepPartial<Insider>): Promise<Insider> {
        if (notIn(insider, 'email')) {
            throw new Error('Missing required field: `email`')
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
    }
}
