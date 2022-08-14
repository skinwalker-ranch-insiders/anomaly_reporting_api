import { MigrationInterface, QueryRunner } from 'typeorm'

import {
    bulkInsertEntity,
    clearEntityData,
    insertEntity,
    runTransaction
} from '../../utilities/migration'
import { ObservedEventType } from '../entities/observedEventType'
import { ObservedEventTypeCategory } from '../entities/observedEventTypeCategory'

/**
 * Seed the database with initial event types and their sub-categories
 */
class SeedInitEventTypesMigration1660358902648 implements MigrationInterface {

    async up(queryRunner: QueryRunner) {
        await runTransaction(queryRunner, async () => {
            const anomalyType = await insertEntity(queryRunner, ObservedEventType, {
                name: 'Anomaly',
                description: 'An observed event which lacks conventional explanation',
                iconCodePoint: 0xf5a9
            })
            await bulkInsertEntity(queryRunner, ObservedEventTypeCategory, [
                {
                    name: 'UAP',
                    description: 'Unidentified Aerial Phenomenon',
                    observedEventType: anomalyType,
                    iconCodePoint: 0xf59c
                },
                {
                    name: 'UFO',
                    description: 'Unidentified Flying Object',
                    observedEventType: anomalyType,
                    iconCodePoint: 0xf40b
                },
                {
                    name: 'Technical Glitch',
                    description: 'Camera glitch, timestamp jitters, etc.',
                    observedEventType: anomalyType,
                    iconCodePoint: 0xf641
                },
                {
                    name: 'Other',
                    description: 'An anomaly which does not fit any category',
                    observedEventType: anomalyType,
                    iconCodePoint: 0xf547
                }
            ])
            const nonAnomalyType = await insertEntity(queryRunner, ObservedEventType, {
                name: 'Non-Anomaly',
                description: 'An observed event which is easily identifiable',
                iconCodePoint: 0xf2fd
            })
            await bulkInsertEntity(queryRunner, ObservedEventTypeCategory, [
                {
                    name: 'Insect or Other Animal',
                    description: 'Easily identifiable insect or other animal',
                    observedEventType: nonAnomalyType,
                    iconCodePoint: 0xf50b
                },
                {
                    name: 'Weather Phenomenon',
                    description: 'Easily identifiable weather phenomenon or pattern',
                    observedEventType: nonAnomalyType,
                    iconCodePoint: 0xf360
                },
                {
                    name: 'One or Multiple Humans',
                    description: 'Easily identifiable humans, one or multiple',
                    observedEventType: nonAnomalyType,
                    iconCodePoint: 0xf516
                },
                {
                    name: 'Other',
                    description: 'A non-anomaly which does not fit any category',
                    observedEventType: nonAnomalyType,
                    iconCodePoint: 0xf547
                }
            ])
            const contagionType = await insertEntity(queryRunner, ObservedEventType, {
                name: 'Poltergeist Contagion',
                description: 'An observed event which coincides with a personal experience or oddity',
                iconCodePoint: 0xf44e
            })
            await bulkInsertEntity(queryRunner, ObservedEventTypeCategory, [
                {
                    name: 'Hitchhiker Effect',
                    description: 'Paranormal phenomenon which may attach its self to investigators',
                    observedEventType: contagionType,
                    iconCodePoint: 0xf432
                },
                {
                    name: 'Electronic Hitchhiker Effect',
                    description: 'Electronic and paranormal phenomenon which may affect electronic devices',
                    observedEventType: contagionType,
                    iconCodePoint: 0xf63d
                },
                {
                    name: 'Compromised Cognition',
                    description: 'An event in which a person may experience inhibited cognition without obvious causation',
                    observedEventType: contagionType,
                    iconCodePoint: 0xf591
                },
                {
                    name: 'Sudden Illness',
                    description: 'An event in which a person may experience sudden and/or unexplainable illness',
                    observedEventType: contagionType,
                    iconCodePoint: 0xf3cc
                },
                {
                    name: 'Nightmare',
                    description: 'A nightmare or night terror which may coincide with a relevant observed event',
                    observedEventType: contagionType,
                    iconCodePoint: 0xf58a
                },
                {
                    name: 'Other',
                    description: 'A contagion which does not fit any category',
                    observedEventType: contagionType!,
                    iconCodePoint: 0xf547
                }
            ])
            await insertEntity(queryRunner, ObservedEventType, {
                name: 'Other',
                description: 'An observed event which does not fit any category',
                iconCodePoint: 0xf547
            })
        })
    }

    async down(queryRunner: QueryRunner) {
        await clearEntityData(queryRunner, ObservedEventTypeCategory)
        await clearEntityData(queryRunner, ObservedEventType)
    }
}

export const SeedInitEventTypesMigration = SeedInitEventTypesMigration1660358902648
