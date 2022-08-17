import {
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'

import { IdField } from '../../utilities/enum'
import { ObservedEvent } from './observedEvent'
import { Insider } from './insider'

@Entity({ name: 'observed_event_likes' })
export class ObservedEventLike {

    @PrimaryGeneratedColumn({ name: IdField.ObservedEventLike })
    id: number

    @ManyToOne(() => ObservedEvent)
    @JoinColumn({ name: IdField.ObservedEvent })
    observedEvent: ObservedEvent

    @CreateDateColumn({ name: 'created_date' })
    createdDate: Date

    @ManyToOne(() => Insider)
    @JoinColumn({ name: 'created_by' })
    createdBy: Insider
}