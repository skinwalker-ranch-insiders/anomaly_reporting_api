import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'

import { AnomalyCase } from './anomalyCase'
import { Insider } from './insider'

@Entity({ name: 'anomaly_case_likes' })
export class AnomalyCaseLikes {

    @PrimaryGeneratedColumn({ name: 'anomaly_case_like_id' })
    id: number

    @ManyToOne(() => AnomalyCase)
    @JoinColumn({ name: 'anomaly_case_id' })
    anomalyCase: AnomalyCase

    @CreateDateColumn({ name: 'created_date' })
    createdDate: Date

    @ManyToOne(() => Insider)
    @JoinColumn({ name: 'created_by' })
    createdBy: Insider
}