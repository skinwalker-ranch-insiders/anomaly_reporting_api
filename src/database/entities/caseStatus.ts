import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({ name: 'case_statuses' })
export class CaseStatus {

    @PrimaryGeneratedColumn({ name: 'case_status_id' })
    id: number

    @Column({ name: 'name' })
    name: string
}