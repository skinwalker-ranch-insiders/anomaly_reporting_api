import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({ name: 'observed_event_types' })
export class ObservedEventType {

    @PrimaryGeneratedColumn({ name: 'observed_event_type_id' })
    id: number

    @Column({ name: 'name' })
    name: string

    @Column({ name: 'description' })
    description: string

    @Column({ name: 'icon_code_point' })
    iconCodePoint: number
}