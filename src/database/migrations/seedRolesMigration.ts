import { MigrationInterface, QueryRunner } from 'typeorm'

import { RoleName } from '../../utilities/enum'
import { Role } from '../entities/role'

class SeedRolesMigration1659753027275 implements MigrationInterface {

    async up(queryRunner: QueryRunner) {
        await queryRunner.startTransaction()
        try {
            await queryRunner.manager.save([
                queryRunner.manager.create(Role, { name: RoleName.Admin }),
                queryRunner.manager.create(Role, { name: RoleName.SWRTeam }),
                queryRunner.manager.create(Role, { name: RoleName.Reviewer }),
                queryRunner.manager.create(Role, { name: RoleName.Member })
            ])
            await queryRunner.commitTransaction()
        } catch {
            await queryRunner.rollbackTransaction()
        }
    }

    async down(queryRunner: QueryRunner) {
        await queryRunner.manager.clear(Role)
    }
}

export const SeedRolesMigration = SeedRolesMigration1659753027275
