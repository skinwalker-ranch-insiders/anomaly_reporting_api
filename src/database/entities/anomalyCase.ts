import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn
} from 'typeorm'

import { Insider } from './insider'
import { CameraView } from './cameraView'
import { ViewportPosition } from './viewportPosition'
import { CaseStatus } from './caseStatus'
import { CaseType } from './caseType'
import { ConclusionCategory } from './conclusionCategory'

@Entity({ name: 'anomaly_cases' })
export class AnomalyCase {

    @PrimaryColumn({ name: 'anomaly_case_id' })
    id: number

    @CreateDateColumn({ name: 'created_date' })
    createdDate: Date

    @ManyToOne(() => Insider)
    @JoinColumn({ name: 'created_by' })
    createdBy: Insider

    @UpdateDateColumn({ name: 'updated_date' })
    updatedDate: Date

    @ManyToOne(() => Insider)
    @JoinColumn({ name: 'updated_by' })
    updatedBy: Insider

    @ManyToOne(() => CameraView)
    @JoinColumn({ name: 'camera_view_id' })
    cameraView: CameraView

    @Column({ name: 'is_audio_only' })
    isAudioOnly: boolean

    @ManyToOne(() => ViewportPosition)
    @JoinColumn({ name: 'viewport_position_id' })
    viewportPosition: ViewportPosition

    @Column({ name: 'video_feed_timestamp' })
    videoFeedTimestamp: Date

    @ManyToOne(() => CaseStatus)
    @JoinColumn({ name: 'case_status_id' })
    caseStatus: CaseStatus

    @Column({ name: 'title' })
    title: string

    @Column({ name: 'description' })
    description: string

    @ManyToOne(() => CaseType)
    @JoinColumn({ name: 'case_type_id' })
    caseType: CaseType

    @Column({ name: 'conclusion' })
    conclusion: string

    @ManyToOne(() => ConclusionCategory)
    @JoinColumn({ name: 'conclusion_category_id' })
    conclusionCategory: ConclusionCategory

    @ManyToOne(() => Insider)
    @JoinColumn({ name: 'closed_by' })
    closedBy: Insider

    @ManyToOne(() => AnomalyCase)
    @JoinColumn({ name: 'duplicate_of' })
    duplicateOf: AnomalyCase
}