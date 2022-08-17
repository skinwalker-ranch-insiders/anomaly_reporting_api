import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'

import { IdField } from '../../utilities/enum'
import { Insider } from './insider'
import { ObservedEventCameraView } from './observedEventCameraView'
import { ObservedEventStatus } from './observedEventStatus'
import { ObservedEventType } from './observedEventType'
import { ObservedEventTypeCategory } from './observedEventTypeCategory'
import { ObservedEventViewportPosition } from './observedEventViewportPosition'

@Entity({ name: 'observed_events' })
export class  ObservedEvent {

    @PrimaryGeneratedColumn({ name: IdField.ObservedEvent })
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

    @Column({ name: 'is_audio_only' })
    isAudioOnly: boolean

    @ManyToOne(() => ObservedEventCameraView)
    @JoinColumn({ name: IdField.ObservedEventCameraView })
    observedEventCameraView: ObservedEventCameraView

    @ManyToOne(() => ObservedEventViewportPosition)
    @JoinColumn({ name: IdField.ObservedEventViewportPosition })
    observedEventViewportPosition: ObservedEventViewportPosition

    @Column({ name: 'video_feed_timestamp' })
    videoFeedTimestamp: Date

    @ManyToOne(() => ObservedEventStatus)
    @JoinColumn({ name: IdField.ObservedEventStatus })
    observedEventStatus: ObservedEventStatus

    @Column({ name: 'title' })
    title: string

    @Column({ name: 'description' })
    description: string

    @ManyToOne(() => ObservedEventType)
    @JoinColumn({ name: IdField.ObservedEventType })
    observedEventType: ObservedEventType

    @ManyToOne(() => ObservedEventTypeCategory)
    @JoinColumn({ name: IdField.ObservedEventTypeCategory })
    observedEventTypeCategory: ObservedEventTypeCategory

    @Column({ name: 'closed_reason', nullable: true })
    closedReason: string

    @Column({ name: 'closed_date', nullable: true })
    closedDate: Date

    @ManyToOne(() => Insider)
    @JoinColumn({ name: 'closed_by' })
    closedBy: Insider

    @ManyToOne(() => ObservedEvent)
    @JoinColumn({ name: 'duplicate_of' })
    duplicateOf: ObservedEvent
}