import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({ name: 'observed_event_viewport_positions' })
export class ObservedEventViewportPosition {

    @PrimaryGeneratedColumn({ name: 'observed_event_viewport_position_id' })
    id: number

    @Column({ name: 'name' })
    name: string
}