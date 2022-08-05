import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'

import { AnomalyCase } from './anomalyCase'
import { Insider } from './insider'

@Entity({ name: 'anomaly_case_attachments' })
export class AnomalyCaseAttachment {

    @PrimaryGeneratedColumn({ name: 'anomaly_case_attachment_id' })
    id: number

    @ManyToOne(() => AnomalyCase)
    @JoinColumn({ name: 'anomaly_case_id' })
    anomalyCase: AnomalyCase

    @CreateDateColumn({ name: 'created_date' })
    createdDate: Date

    @ManyToOne(() => Insider)
    @JoinColumn({ name: 'created_by' })
    createdBy: Insider

    @Column({ name: 'url' })
    url: string

    @Column({ name: 'thumbnail_url' })
    thumbnailUrl: string
}