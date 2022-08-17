import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { IdField } from '../../utilities/enum'
import { ObservedEventType } from './observedEventType'

@Entity({ name: 'observed_event_type_categories' })
export class ObservedEventTypeCategory {

    @PrimaryGeneratedColumn({ name: IdField.ObservedEventTypeCategory })
    id: number

    @ManyToOne(() => ObservedEventType)
    @JoinColumn({ name: IdField.ObservedEventType })
    observedEventType: ObservedEventType

    @Column({ name: 'name' })
    name: string

    @Column({ name: 'description' })
    description: string

    @Column({ name: 'icon_code_point' })
    iconCodePoint: number
}