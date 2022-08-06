import { DataSource } from 'typeorm'

import { AnomalyCase } from './entities/anomalyCase'
import { AnomalyCaseComments } from './entities/anomalyCaseComment'
import { AnomalyCaseAttachment } from './entities/anomalyCaseAttachment'
import { AnomalyCaseLike } from './entities/anomalyCaseLike'
import { CameraView } from './entities/cameraView'
import { CaseStatus } from './entities/caseStatus'
import { CaseType } from './entities/caseType'
import { ConclusionCategory } from './entities/conclusionCategory'
import { Insider } from './entities/insider'
import { Role } from './entities/role'
import { ViewportPosition } from './entities/viewportPosition'

import { SeedRolesMigration } from './migrations/seedRolesMigration'

export const database = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    synchronize: true,
    entities: [
        AnomalyCase,
        AnomalyCaseComments,
        AnomalyCaseAttachment,
        AnomalyCaseLike,
        CameraView,
        CaseStatus,
        CaseType,
        ConclusionCategory,
        Insider,
        Role,
        ViewportPosition
    ],
    migrationsRun: true,
    migrations: [
        SeedRolesMigration
    ]
})
