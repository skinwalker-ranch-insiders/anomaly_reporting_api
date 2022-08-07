import { DataSource } from 'typeorm'

import { env } from '../utilities/misc'
import { Insider } from './entities/insider'
import { InsiderRole } from './entities/insiderRole'
import { ObservedEvent } from './entities/observedEvent'
import { ObservedEventAttachment } from './entities/observedEventAttachment'
import { ObservedEventCameraView } from './entities/observedEventCameraView'
import { ObservedEventComment } from './entities/observedEventComment'
import { ObservedEventLike } from './entities/observedEventLike'
import { ObservedEventStatus } from './entities/observedEventStatus'
import { ObservedEventType } from './entities/observedEventType'
import { ObservedEventTypeCategory } from './entities/observedEventTypeCategory'
import { ObservedEventViewportPosition } from './entities/observedEventViewportPosition'
import { SeedRolesMigration } from './migrations/seedRolesMigration'
import { SeedEventTypesMigration } from './migrations/seedEventTypesMigration'

export const database = new DataSource({
    type: 'postgres',
    host: env('POSTGRES_HOST', 'localhost'),
    port: Number.parseInt(env('POSTGRES_PORT', '5432')),
    username: env('POSTGRES_USERNAME', 'postgres'),
    password: env('POSTGRES_PASSWORD', 'postgres'),
    database: env('POSTGRES_DATABASE', 'postgres'),
    schema: env('POSTGRES_SCHEMA', 'swr_event_reports'),
    synchronize: true,
    entities: [
        Insider,
        InsiderRole,
        ObservedEvent,
        ObservedEventAttachment,
        ObservedEventCameraView,
        ObservedEventComment,
        ObservedEventLike,
        ObservedEventStatus,
        ObservedEventType,
        ObservedEventTypeCategory,
        ObservedEventViewportPosition
    ],
    migrationsRun: true,
    migrations: [
        SeedRolesMigration,
        SeedEventTypesMigration,
    ]
})
