import { MigrationInterface, QueryRunner } from 'typeorm'
import { bulkInsertEntity, clearEntityData, runTransaction } from '../../utilities/migration'
import { ObservedEventViewportPosition } from '../entities/observedEventViewportPosition'
import { ViewportPositionName } from '../../utilities/enum'
import { ObservedEventCameraView } from '../entities/observedEventCameraView'

class SeedInitCameraDataMigration1660457577452 implements MigrationInterface {

    async up(queryRunner: QueryRunner) {
        await runTransaction(queryRunner, async () => {
            await bulkInsertEntity(queryRunner, ObservedEventViewportPosition, [
                { name: ViewportPositionName.TopLeft },
                { name: ViewportPositionName.TopCenter },
                { name: ViewportPositionName.TopRight },
                { name: ViewportPositionName.MiddleLeft },
                { name: ViewportPositionName.MiddleCenter },
                { name: ViewportPositionName.MiddleRight },
                { name: ViewportPositionName.BottomLeft },
                { name: ViewportPositionName.BottomCenter },
                { name: ViewportPositionName.BottomRight }
            ])
            await bulkInsertEntity(queryRunner, ObservedEventCameraView, [
                { name: 'NEX-01' },
                { name: 'NEX-02' },
                { name: 'NEX-03' },
                { name: 'EN-01' },
                { name: 'EN-02' },
                { name: 'EN-03' },
                { name: 'OP1-SS' },
                { name: 'OP1-NE' },
                { name: 'OP1-SW' },
                { name: 'HS2-CHhv' },
                { name: 'HS2-HSnw' },
                { name: 'HS2-HSiv' },
                { name: 'HS2-CHwf' },
                { name: 'CC-03' },
                { name: 'SP-W' },
                { name: 'IEC-01' },
                { name: 'OP1_ASC' }
            ])
        })
    }

    async down(queryRunner: QueryRunner) {
        await clearEntityData(queryRunner, ObservedEventCameraView)
        await clearEntityData(queryRunner, ObservedEventViewportPosition)
    }
}

export const SeedInitCameraDataMigration = SeedInitCameraDataMigration1660457577452
