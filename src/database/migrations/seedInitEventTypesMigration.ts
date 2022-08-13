import { MigrationInterface, QueryRunner } from 'typeorm'

import {
    AnomalyTypeCategoryName, ContagionTypeCategoryName,
    NonAnomalyTypeCategoryName,
    ObservedEventTypeName
} from '../../utilities/enum'
import { ObservedEventType } from '../entities/observedEventType'
import { ObservedEventTypeCategory } from '../entities/observedEventTypeCategory'

class SeedInitEventTypesMigration1660358902648 implements MigrationInterface {

    async up(queryRunner: QueryRunner) {
        await queryRunner.startTransaction()
        try {
            await queryRunner.manager.save([
                queryRunner.manager.create(ObservedEventType, {
                    name: ObservedEventTypeName.Anomaly,
                    description: 'An observed event which lacks conventional explanation',
                    iconCodePoint: 0xf5a9
                }),
                queryRunner.manager.create(ObservedEventType, {
                    name: ObservedEventTypeName.NonAnomaly,
                    description: 'An observed event which is easily identifiable',
                    iconCodePoint: 0xf2fd
                }),
                queryRunner.manager.create(ObservedEventType, {
                    name: ObservedEventTypeName.Contagion,
                    description: 'An observed event which coincides with a personal experience or oddity',
                    iconCodePoint: 0xf44e
                }),
                queryRunner.manager.create(ObservedEventType, {
                    name: ObservedEventTypeName.Other,
                    description: 'An observed event which does not fit any category',
                    iconCodePoint: 0xf547
                }),
            ])

            const anomalyType = await queryRunner.manager.findOne(ObservedEventType, {
                where: {
                    name: ObservedEventTypeName.Anomaly
                }
            })

            await queryRunner.manager.save([
                queryRunner.manager.create(ObservedEventTypeCategory, {
                    name: AnomalyTypeCategoryName.UAP,
                    description: 'Unidentified Aerial Phenomenon',
                    observedEventType: anomalyType!,
                    iconCodePoint: 0xf59c
                }),
                queryRunner.manager.create(ObservedEventTypeCategory, {
                    name: AnomalyTypeCategoryName.UFO,
                    description: 'Unidentified Flying Object',
                    observedEventType: anomalyType!,
                    iconCodePoint: 0xf40b
                }),
                queryRunner.manager.create(ObservedEventTypeCategory, {
                    name: AnomalyTypeCategoryName.Glitch,
                    description: 'Camera glitch, timestamp jitters, etc.',
                    observedEventType: anomalyType!,
                    iconCodePoint: 0xf641
                }),
                queryRunner.manager.create(ObservedEventTypeCategory, {
                    name: AnomalyTypeCategoryName.Other,
                    description: 'An anomaly which does not fit any category',
                    observedEventType: anomalyType!,
                    iconCodePoint: 0xf547
                })
            ])

            const nonAnomalyType = await queryRunner.manager.findOne(ObservedEventType, {
                where: {
                    name: ObservedEventTypeName.NonAnomaly
                }
            })

            await queryRunner.manager.save([
                queryRunner.manager.create(ObservedEventTypeCategory, {
                    name: NonAnomalyTypeCategoryName.Animal,
                    description: 'Easily identifiable insect or other animal',
                    observedEventType: nonAnomalyType!,
                    iconCodePoint: 0xf50b
                }),
                queryRunner.manager.create(ObservedEventTypeCategory, {
                    name: NonAnomalyTypeCategoryName.Weather,
                    description: 'Easily identifiable weather phenomenon or pattern',
                    observedEventType: nonAnomalyType!,
                    iconCodePoint: 0xf360
                }),
                queryRunner.manager.create(ObservedEventTypeCategory, {
                    name: NonAnomalyTypeCategoryName.People,
                    description: 'Easily identifiable humans, one or multiple',
                    observedEventType: nonAnomalyType!,
                    iconCodePoint: 0xf516
                }),
                queryRunner.manager.create(ObservedEventTypeCategory, {
                    name: NonAnomalyTypeCategoryName.Other,
                    description: 'A non-anomaly which does not fit any category',
                    observedEventType: nonAnomalyType!,
                    iconCodePoint: 0xf547
                })
            ])

            const contagionType = await queryRunner.manager.findOne(ObservedEventType, {
                where: {
                    name: ObservedEventTypeName.Contagion
                }
            })

            await queryRunner.manager.save([
                queryRunner.manager.create(ObservedEventTypeCategory, {
                    name: ContagionTypeCategoryName.Hitchhiker,
                    description: 'Paranormal phenomenon which may attach its self to investigators',
                    observedEventType: contagionType!,
                    iconCodePoint: 0xf432
                }),
                queryRunner.manager.create(ObservedEventTypeCategory, {
                    name: ContagionTypeCategoryName.ElectronicHitchhiker,
                    description: 'Electronic and paranormal phenomenon which may affect electronic devices',
                    observedEventType: contagionType!,
                    iconCodePoint: 0xf63d
                }),
                queryRunner.manager.create(ObservedEventTypeCategory, {
                    name: ContagionTypeCategoryName.CompromisedCognition,
                    description: 'An event in which a person may experience inhibited cognition without obvious causation',
                    observedEventType: contagionType!,
                    iconCodePoint: 0xf591
                }),
                queryRunner.manager.create(ObservedEventTypeCategory, {
                    name: ContagionTypeCategoryName.Illness,
                    description: 'An event in which a person may experience sudden and/or unexplainable illness',
                    observedEventType: contagionType!,
                    iconCodePoint: 0xf3cc
                }),
                queryRunner.manager.create(ObservedEventTypeCategory, {
                    name: ContagionTypeCategoryName.Nightmare,
                    description: 'A nightmare or night terror which may coincide with a relevant observed event',
                    observedEventType: contagionType!,
                    iconCodePoint: 0xf58a
                }),
                queryRunner.manager.create(ObservedEventTypeCategory, {
                    name: ContagionTypeCategoryName.Other,
                    description: 'A contagion which does not fit any category',
                    observedEventType: contagionType!,
                    iconCodePoint: 0xf547
                })
            ])

            await queryRunner.commitTransaction()
        } catch {
            await queryRunner.rollbackTransaction()
        }
    }

    async down(queryRunner: QueryRunner) {
        await queryRunner.manager.clear(ObservedEventType)
        await queryRunner.manager.clear(ObservedEventTypeCategory)
    }
}

export const SeedInitEventTypesMigration = SeedInitEventTypesMigration1660358902648
