import { MigrationInterface, QueryRunner } from 'typeorm'

import { RoleName, StatusName } from '../../utilities/enum'
import { InsiderRole } from '../entities/insiderRole'
import { bulkInsertEntity, clearEntityData, runTransaction } from '../../utilities/migration'
import { ObservedEventStatus } from '../entities/observedEventStatus'

/**
 * Seed the database with recognized event statuses
 */
class SeedInitEventStatusesMigration1660489627211 implements MigrationInterface {

    async up(queryRunner: QueryRunner) {
        await runTransaction(queryRunner, async () => {
            await bulkInsertEntity(queryRunner, ObservedEventStatus, [
                { name: StatusName.Open },
                { name: StatusName.InitialReview },
                { name: StatusName.AdvancedReview },
                { name: StatusName.Escalated },
                { name: StatusName.Closed },
                { name: StatusName.Archived },
            ])
        })
    }

    async down(queryRunner: QueryRunner) {
        await clearEntityData(queryRunner, InsiderRole)
    }
}

export const SeedInitEventStatusesMigration = SeedInitEventStatusesMigration1660489627211
