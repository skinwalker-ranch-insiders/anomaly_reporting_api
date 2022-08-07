import { database } from '../database'
import { InsiderRole } from '../database/entities/insiderRole'
import { RoleName } from '../utilities/enum'

/**
 * Includes service calls to retrieve static data and dropdown options from the database
 */
export const dataOptionsService = {
    roleRepository: database.getRepository(InsiderRole),

    /**
     * Retrieve a single role by its name
     * @param name
     */
    async getRoleByName(name: RoleName): Promise<InsiderRole | null> {
        return this.roleRepository.findOne({
            where: {
                name
            }
        })
    },
}
