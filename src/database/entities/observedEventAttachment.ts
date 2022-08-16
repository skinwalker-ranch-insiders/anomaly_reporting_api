import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'

import { ObservedEvent } from './observedEvent'
import { Insider } from './insider'
import { IdField } from '../../utilities/enum'

@Entity({ name: 'observed_event_attachments' })
export class ObservedEventAttachment {

    @PrimaryGeneratedColumn({ name: 'observed_event_attachment_id' })
    id: number

    @ManyToOne(() => ObservedEvent)
    @JoinColumn({ name: IdField.ObservedEvent })
    observedEvent: ObservedEvent

    @CreateDateColumn({ name: 'created_date' })
    createdDate: Date

    @ManyToOne(() => Insider)
    @JoinColumn({ name: 'created_by' })
    createdBy: Insider

    @Column({ name: 'url' })
    url: string

    @Column({ name: 'thumbnail_url' })
    thumbnailUrl: string
}