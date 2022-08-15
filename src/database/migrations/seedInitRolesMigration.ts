import { MigrationInterface, QueryRunner } from 'typeorm'

import { RoleName } from '../../utilities/enum'
import { bulkInsertEntity, clearEntityData, runTransaction } from '../../utilities/migration'
import { InsiderRole } from '../entities/insiderRole'

/**
 * Seed the database with recognized user roles
 */
class SeedInitRolesMigration1660358925997 implements MigrationInterface {

    async up(queryRunner: QueryRunner) {
        await runTransaction(queryRunner, async () => {
            await bulkInsertEntity(queryRunner, InsiderRole, [
                { name: RoleName.Admin },
                { name: RoleName.SWRTeam },
                { name: RoleName.AdvancedReviewer },
                { name: RoleName.Reviewer },
                { name: RoleName.Member }
            ])
        })
    }

    async down(queryRunner: QueryRunner) {
        await clearEntityData(queryRunner, InsiderRole)
    }
}

export const SeedInitRolesMigration = SeedInitRolesMigration1660358925997
