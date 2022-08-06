import { database } from '../database'
import { Role } from '../database/entities/role'
import { RoleName } from '../utilities/enum'

/**
 * Includes service calls to retrieve static data and dropdown options from the database
 */
export const dataOptionsService = {
    roleRepository: database.getRepository(Role),

    /**
     * Retrieve a single role by its name
     * @param name
     */
    async getRoleByName(name: RoleName): Promise<Role | null> {
        return this.roleRepository.findOne({
            where: {
                name
            }
        })
    },
}
