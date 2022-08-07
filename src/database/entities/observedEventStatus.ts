import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({ name: 'observed_event_statuses' })
export class ObservedEventStatus {

    @PrimaryGeneratedColumn({ name: 'observed_event_status_id' })
    id: number

    @Column({ name: 'name' })
    name: string
}