import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ObservedEventViewportPosition {

    @PrimaryGeneratedColumn({ name: 'viewport_position_id' })
    id: number

    @Column({ name: 'name' })
    name: string
}