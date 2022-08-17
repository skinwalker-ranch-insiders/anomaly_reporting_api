import {
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm'

import { IdField } from '../../utilities/enum'
import { Insider } from './insider'
import { ObservedEventStatus } from './observedEventStatus'
import { ObservedEvent } from './observedEvent'

@Entity({ name: 'observed_event_escalation_votes' })
export class ObservedEventEscalationVote {

    @PrimaryGeneratedColumn({ name: IdField.ObservedEventEscalationVote })
    id: number

    @ManyToOne(() => ObservedEvent)
    @JoinColumn({ name: IdField.ObservedEvent })
    observedEvent: ObservedEvent

    @ManyToOne(() => ObservedEventStatus)
    @JoinColumn({ name: IdField.ObservedEventStatus })
    observedEventStatus: ObservedEventStatus

    @CreateDateColumn({ name: 'created_date' })
    createdDate: Date

    @ManyToOne(() => Insider)
    @JoinColumn({ name: 'created_by' })
    createdBy: Insider
}