import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import { IdField } from '../../utilities/enum'

@Entity({ name: 'observed_event_types' })
export class ObservedEventType {

    @PrimaryGeneratedColumn({ name: IdField.ObservedEventType })
    id: number

    @Column({ name: 'name' })
    name: string

    @Column({ name: 'description' })
    description: string

    @Column({ name: 'icon_code_point' })
    iconCodePoint: number
}