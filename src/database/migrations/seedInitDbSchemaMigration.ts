import { MigrationInterface, QueryRunner } from 'typeorm'

import { createTable, dropTable } from '../../utilities/migration'
import { Insider } from '../entities/insider'
import { InsiderRole } from '../entities/insiderRole'
import { ObservedEvent } from '../entities/observedEvent'
import { ObservedEventAttachment } from '../entities/observedEventAttachment'
import { ObservedEventCameraView } from '../entities/observedEventCameraView'
import { ObservedEventChangeLog } from '../entities/observedEventChangeLog'
import { ObservedEventComment } from '../entities/observedEventComment'
import { ObservedEventLike } from '../entities/observedEventLike'
import { ObservedEventType } from '../entities/observedEventType'
import { ObservedEventTypeCategory } from '../entities/observedEventTypeCategory'
import { ObservedEventStatus } from '../entities/observedEventStatus'
import { ObservedEventViewportPosition } from '../entities/observedEventViewportPosition'

/**
 * Seed the database with initial tables from entity classes
 */
class SeedInitDbSchemaMigration1660279324604 implements MigrationInterface {

    async up(queryRunner: QueryRunner) {
        await createTable(queryRunner, Insider)
        await createTable(queryRunner, InsiderRole)
        await createTable(queryRunner, ObservedEvent)
        await createTable(queryRunner, ObservedEventAttachment)
        await createTable(queryRunner, ObservedEventCameraView)
        await createTable(queryRunner, ObservedEventChangeLog)
        await createTable(queryRunner, ObservedEventComment)
        await createTable(queryRunner, ObservedEventLike)
        await createTable(queryRunner, ObservedEventStatus)
        await createTable(queryRunner, ObservedEventType)
        await createTable(queryRunner, ObservedEventTypeCategory)
        await createTable(queryRunner, ObservedEventViewportPosition)
    }

    async down(queryRunner: QueryRunner) {
        await dropTable(queryRunner, ObservedEventViewportPosition)
        await dropTable(queryRunner, ObservedEventTypeCategory)
        await dropTable(queryRunner, ObservedEventType)
        await dropTable(queryRunner, ObservedEventStatus)
        await dropTable(queryRunner, ObservedEventLike)
        await dropTable(queryRunner, ObservedEventComment)
        await dropTable(queryRunner, ObservedEventChangeLog)
        await dropTable(queryRunner, ObservedEventCameraView)
        await dropTable(queryRunner, ObservedEventAttachment)
        await dropTable(queryRunner, ObservedEvent)
        await dropTable(queryRunner, InsiderRole)
        await dropTable(queryRunner, Insider)
    }
}

export const SeedInitDbSchemaMigration = SeedInitDbSchemaMigration1660279324604
