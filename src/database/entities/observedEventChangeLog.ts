import {
    Column,
    CreateDateColumn,
    Entity, Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm'

import { Insider } from './insider'
import { ObservedEvent } from './observedEvent'

@Entity({ name: 'observed_event_change_logs' })
export class ObservedEventChangeLog {

    @PrimaryGeneratedColumn({ name: 'observed_event_change_log_id' })
    id: number

    @Index('observed_event_change_log_observed_event_id_index')
    @ManyToOne(() => ObservedEvent)
    @JoinColumn({ name: 'observed_event_id' })
    observedEvent: ObservedEvent

    @CreateDateColumn({ name: 'created_date' })
    createdDate: Date

    @ManyToOne(() => Insider)
    @JoinColumn({ name: 'created_by' })
    createdBy: Insider

    @Column({ name: 'message' })
    message: string
}
