import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({ name: 'camera_views' })
export class CameraView {

    @PrimaryGeneratedColumn({
        name: 'camera_view_id'
    })
    id: number

    @Column({ name: 'name' })
    name: string
}