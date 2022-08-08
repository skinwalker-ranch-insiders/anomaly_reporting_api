import { MigrationInterface, QueryRunner } from 'typeorm'

import { RoleName } from '../../utilities/enum'
import { InsiderRole } from '../entities/insiderRole'

class SeedRolesMigration1659846113951 implements MigrationInterface {

    async up(queryRunner: QueryRunner) {
        await queryRunner.startTransaction()
        try {
            await queryRunner.manager.save([
                queryRunner.manager.create(InsiderRole, { name: RoleName.Admin }),
                queryRunner.manager.create(InsiderRole, { name: RoleName.SWRTeam }),
                queryRunner.manager.create(InsiderRole, { name: RoleName.SrReviewer }),
                queryRunner.manager.create(InsiderRole, { name: RoleName.Reviewer }),
                queryRunner.manager.create(InsiderRole, { name: RoleName.Member })
            ])
            await queryRunner.commitTransaction()
        } catch {
            await queryRunner.rollbackTransaction()
        }
    }

    async down(queryRunner: QueryRunner) {
        await queryRunner.manager.clear(InsiderRole)
    }
}

export const SeedRolesMigration = SeedRolesMigration1659846113951
