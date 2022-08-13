import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { ObservedEventType } from './observedEventType'

@Entity({ name: 'observed_event_type_categories' })
export class ObservedEventTypeCategory {

    @PrimaryGeneratedColumn({ name: 'observed_event_type_category_id' })
    id: number

    @ManyToOne(() => ObservedEventType)
    @JoinColumn({ name: 'observed_event_type_id' })
    observedEventType: ObservedEventType

    @Column({ name: 'name' })
    name: string

    @Column({ name: 'description' })
    description: string

    @Column({ name: 'icon_code_point' })
    iconCodePoint: number
}