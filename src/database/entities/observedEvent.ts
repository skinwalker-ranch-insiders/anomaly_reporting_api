import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'

import { Insider } from './insider'
import { ObservedEventCameraView } from './observedEventCameraView'
import { ObservedEventStatus } from './observedEventStatus'
import { ObservedEventType } from './observedEventType'
import { ObservedEventTypeCategory } from './observedEventTypeCategory'
import { ObservedEventViewportPosition } from './observedEventViewportPosition'

@Entity({ name: 'observed_events' })
export class  ObservedEvent {

    @PrimaryGeneratedColumn({ name: 'observed_event_id' })
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
    @JoinColumn({ name: 'observed_event_camera_view_id' })
    observedEventCameraView: ObservedEventCameraView

    @ManyToOne(() => ObservedEventViewportPosition)
    @JoinColumn({ name: 'observed_event_viewport_position_id' })
    observedEventViewportPosition: ObservedEventViewportPosition

    @Column({ name: 'video_feed_timestamp' })
    videoFeedTimestamp: Date

    @ManyToOne(() => ObservedEventStatus)
    @JoinColumn({ name: 'observed_event_status_id' })
    observedEventStatus: ObservedEventStatus

    @Column({ name: 'title' })
    title: string

    @Column({ name: 'description' })
    description: string

    @ManyToOne(() => ObservedEventType)
    @JoinColumn({ name: 'observed_event_type_id' })
    observedEventType: ObservedEventType

    @ManyToOne(() => ObservedEventType)
    @JoinColumn({ name: 'observed_event_type_category_id' })
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