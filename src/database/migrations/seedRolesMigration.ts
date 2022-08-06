import { MigrationInterface, QueryRunner } from 'typeorm'

import { Role } from '../entities/role'

class SeedRolesMigration1659753027275 implements MigrationInterface {

    async up(queryRunner: QueryRunner) {
        await queryRunner.startTransaction()
        try {
            await queryRunner.manager.save([
                queryRunner.manager.create(Role, { name: 'Admin' }),
                queryRunner.manager.create(Role, { name: 'SWR Team' }),
                queryRunner.manager.create(Role, { name: 'Reviewer' }),
                queryRunner.manager.create(Role, { name: 'Member' })
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
