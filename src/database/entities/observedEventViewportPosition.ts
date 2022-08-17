import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

import { IdField } from '../../utilities/enum'

@Entity({ name: 'observed_event_viewport_positions' })
export class ObservedEventViewportPosition {

    @PrimaryGeneratedColumn({ name: IdField.ObservedEventViewportPosition })
    id: number

    @Column({ name: 'name' })
    name: string
}