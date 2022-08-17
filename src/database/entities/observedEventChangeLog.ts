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
import { IdField } from '../../utilities/enum'

@Entity({ name: 'observed_event_change_logs' })
export class ObservedEventChangeLog {

    @PrimaryGeneratedColumn({ name: IdField.ObservedEventChangeLog })
    id: number

    @ManyToOne(() => ObservedEvent)
    @JoinColumn({ name: IdField.ObservedEvent })
    observedEvent: ObservedEvent

    @CreateDateColumn({ name: 'created_date' })
    createdDate: Date

    @ManyToOne(() => Insider)
    @JoinColumn({ name: 'created_by' })
    createdBy: Insider

    @Column({ name: 'message' })
    message: string
}
