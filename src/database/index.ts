import { DataSource, LoggerOptions } from 'typeorm'

import { env } from '../utilities/misc'
import { Insider } from './entities/insider'
import { InsiderRole } from './entities/insiderRole'
import { ObservedEvent } from './entities/observedEvent'
import { ObservedEventAttachment } from './entities/observedEventAttachment'
import { ObservedEventCameraView } from './entities/observedEventCameraView'
import { ObservedEventChangeLog } from './entities/observedEventChangeLog'
import { ObservedEventComment } from './entities/observedEventComment'
import { ObservedEventLike } from './entities/observedEventLike'
import { ObservedEventStatus } from './entities/observedEventStatus'
import { ObservedEventType } from './entities/observedEventType'
import { ObservedEventTypeCategory } from './entities/observedEventTypeCategory'
import { ObservedEventViewportPosition } from './entities/observedEventViewportPosition'
import { SeedInitDbSchemaMigration } from './migrations/seedInitDbSchemaMigration'
import { SeedInitEventTypesMigration } from './migrations/seedInitEventTypesMigration'
import { SeedInitRolesMigration } from './migrations/seedInitRolesMigration'
import { SeedInitEventStatusesMigration } from './migrations/seedInitEventStatusesMigration'
import { SeedInitCameraDataMigration } from './migrations/seedInitCameraDataMigration'

const DATABASE_TYPE = 'postgres'
const DATABASE_HOST = env('DATABASE_HOST', 'localhost')
const DATABASE_PORT = Number.parseInt(env('DATABASE_PORT', '5432'))
const DATABASE_USERNAME = env('DATABASE_USERNAME', 'postgres')
const DATABASE_PASSWORD = env('DATABASE_PASSWORD', 'postgres')
const DATABASE_NAME = env('DATABASE_NAME', 'swr_insider_reports')
const DATABASE_SCHEMA = env('DATABASE_SCHEMA', 'swr_insider_reports')
const DATABASE_LOGGING = JSON.parse(env('DATABASE_LOGGING', '["error"]'))

export const database = new DataSource({
    type: DATABASE_TYPE,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    schema: DATABASE_SCHEMA,
    logging: DATABASE_LOGGING,
    entities: [
        Insider,
        InsiderRole,
        ObservedEvent,
        ObservedEventAttachment,
        ObservedEventCameraView,
        ObservedEventChangeLog,
        ObservedEventComment,
        ObservedEventLike,
        ObservedEventStatus,
        ObservedEventType,
        ObservedEventTypeCategory,
        ObservedEventViewportPosition
    ],
    migrationsRun: true,
    migrations: [
        SeedInitDbSchemaMigration,
        SeedInitEventTypesMigration,
        SeedInitEventStatusesMigration,
        SeedInitCameraDataMigration,
        SeedInitRolesMigration,
    ]
})
