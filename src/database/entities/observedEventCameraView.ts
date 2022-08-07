import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({ name: 'observed_event_camera_views' })
export class ObservedEventCameraView {

    @PrimaryGeneratedColumn({ name: 'observed_event_camera_view_id' })
    id: number

    @Column({ name: 'name' })
    name: string
}