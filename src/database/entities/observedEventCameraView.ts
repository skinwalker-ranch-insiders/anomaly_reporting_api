import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IdField } from '../../utilities/enum'

@Entity({ name: 'observed_event_camera_views' })
export class ObservedEventCameraView {

    @PrimaryGeneratedColumn({ name: IdField.ObservedEventCameraView })
    id: number

    @Column({ name: 'name' })
    name: string
}