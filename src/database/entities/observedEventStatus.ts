import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'
import { IdField } from '../../utilities/enum'

@Entity({ name: 'observed_event_statuses' })
export class ObservedEventStatus {

    @PrimaryGeneratedColumn({ name: IdField.ObservedEventStatus })
    id: number

    @Index('observed_event_status_name_index')
    @Column({ name: 'name' })
    name: string
}