import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Insider } from './insider'
import { ObservedEventStatus } from './observedEventStatus'
import { ObservedEvent } from './observedEvent'

@Entity({ name: 'observed_event_escalation_votes' })
export class ObservedEventEscalationVote {

    @PrimaryGeneratedColumn({ name: 'observed_event_escalation_vote_id' })
    id: number

    @CreateDateColumn({ name: 'created_date' })
    createdDate: Date

    @ManyToOne(() => Insider)
    @JoinColumn({ name: 'created_by' })
    createdBy: Insider

    @ManyToOne(() => ObservedEvent)
    @JoinColumn({ name: 'observed_event_id' })
    observedEvent: ObservedEvent

    @ManyToOne(() => ObservedEventStatus)
    @JoinColumn({ name: 'current_status' })
    fromStatus: ObservedEventStatus
}