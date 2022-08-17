import {
    Column,
    CreateDateColumn,
    Entity, Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'

import { ObservedEvent } from './observedEvent'
import { Insider } from './insider'
import { IdField } from '../../utilities/enum'

@Entity({ name: 'observed_event_comments' })
export class ObservedEventComment {

    @PrimaryGeneratedColumn({ name: IdField.ObservedEventComment })
    id: number

    @ManyToOne(() => ObservedEvent)
    @JoinColumn({ name: IdField.ObservedEvent })
    observedEvent: ObservedEvent

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

    @Column({ name: 'content' })
    content: string
}