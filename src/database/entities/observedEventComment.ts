import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'

import { ObservedEvent } from './observedEvent'
import { Insider } from './insider'

@Entity({ name: 'observed_event_comments' })
export class ObservedEventComment {

    @PrimaryGeneratedColumn({ name: 'observed_event_comment_id' })
    id: number

    @ManyToOne(() => ObservedEvent)
    @JoinColumn({ name: 'observed_event_id' })
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